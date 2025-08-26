// main.js (inside /build/)

import { CameraProjections, IfcViewerAPI } from './web-ifc-viewer.js'; // local import
import { createSideMenuButton } from './utils/gui-creator.js';
import {
  IFCSPACE, IFCOPENINGELEMENT, IFCFURNISHINGELEMENT, IFCWALL, IFCWINDOW, IFCCURTAINWALL, IFCMEMBER, IFCPLATE
} from './web-ifc.js'; // local import
import {
  MeshBasicMaterial,
  LineBasicMaterial,
  Color,
  Vector2,
  DepthTexture,
  WebGLRenderTarget, Material, BufferGeometry, BufferAttribute, Mesh
} from 'three';
import { ClippingEdges } from './components/display/clipping-planes/clipping-edges.js';
import Stats from 'stats.js/src/Stats.js';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(255, 255, 255) });
viewer.axes.setAxes();
viewer.grid.setGrid();

// Setup stats
const stats = new Stats();
stats.showPanel(2);
document.body.append(stats.dom);
stats.dom.style.right = '0px';
stats.dom.style.left = 'auto';
viewer.context.stats = stats;

// IFC manager
const manager = viewer.IFC.loader.ifcManager;

// Use local wasm files
viewer.IFC.setWasmPath('./'); // wasm files are in /build/

viewer.IFC.loader.ifcManager.applyWebIfcConfig({
  USE_FAST_BOOLS: true,
  COORDINATE_TO_ORIGIN: true
});

viewer.context.renderer.postProduction.active = true;

// First load flag
let first = true;
let model;

// Load IFC file function
const loadIfc = async (event) => {
  const selectedFile = event.target.files[0];
  if (!selectedFile) return;

  const overlay = document.getElementById('loading-overlay');
  const progressText = document.getElementById('loading-progress');

  overlay?.classList.remove('hidden');
  progressText && (progressText.innerText = `Loading`);

  viewer.IFC.loader.ifcManager.setOnProgress((event) => {
    const percentage = Math.floor((event.loaded * 100) / event.total);
    progressText && (progressText.innerText = `Loaded ${percentage}%`);
  });

  viewer.IFC.loader.ifcManager.parser.setupOptionalCategories({
    [IFCSPACE]: false,
    [IFCOPENINGELEMENT]: false
  });

  model = await viewer.IFC.loadIfc(selectedFile, false);

  if (first) first = false;
  else ClippingEdges.forceStyleUpdate = true;

  await viewer.shadowDropper.renderShadow(model.modelID);
  overlay?.classList.add('hidden');
};

// Input element for file selection
const inputElement = document.createElement('input');
inputElement.type = 'file';
inputElement.classList.add('hidden');
inputElement.addEventListener('change', loadIfc, false);

// Key and mouse events
window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();
window.onkeydown = (event) => {
  if (event.code === 'Delete') viewer.clipper.deletePlane();
  if (event.code === 'Escape') viewer.IFC.selector.unHighlightIfcItems();
  if (event.code === 'KeyC') viewer.context.ifcCamera.toggleProjection();
  if (event.code === 'KeyD') viewer.IFC.removeIfcModel(0);
};
window.ondblclick = async () => {
  if (viewer.clipper.active) viewer.clipper.createPlane();
  else {
    const result = await viewer.IFC.selector.highlightIfcItem(true);
    if (!result) return;
    const { modelID, id } = result;
    const props = await viewer.IFC.getProperties(modelID, id, true, false);
    console.log(props);
  }
};

// UI buttons
const loadButton = createSideMenuButton('./resources/folder-icon.svg');
loadButton.addEventListener('click', () => {
  loadButton.blur();
  inputElement.click();
});

const sectionButton = createSideMenuButton('./resources/section-plane-down.svg');
sectionButton.addEventListener('click', () => {
  sectionButton.blur();
  viewer.clipper.toggle();
});

const dropBoxButton = createSideMenuButton('./resources/dropbox-icon.svg');
dropBoxButton.addEventListener('click', () => {
  dropBoxButton.blur();
  viewer.dropbox.loadDropboxIfc();
});
