#  Project Dashboard Prototype

An interactive split-screen web dashboard displaying a panoramic (Panoee or Matterport) virtual tour on the left and interchangeable 3D/BIM, PDF, DXF, or external 3D model viewers on the right. Built as a modular, open-source prototype with the aim of enabling seamless visualization and collaboration.

---

##  Overview

This project delivers a modular dashboard tool that:

- Loads a **360° virtual tour** from a URL file (`vt_link.txt`).
- Dynamically displays one of:
  - **IFC/BIM models** using a local `web-ifc-viewer` build,
  - **PDF documents**,
  - **DXF files**,
  - or **3D model links** (e.g., Sketchfab, AutodeskViewer etc),
    based on the presence of local files or provided links.
- Is fully **hostable via GitHub Pages or Netlify** for easy internal sharing.

---

##  How to Use

1. Clone or download this repo.
2. Put your files alongside the HTML:
   - `vt_link.txt` – contains the virtual tour URL.
   - `BIM_file.ifc`, `DOC_file.pdf`, `DXF_file.dxf` (as required).
   - `model_link.txt` – link to external 3D viewer (Sketchfab, etc.).
   - A `build/` folder containing `main.js` and associated `.wasm` files for the IFC viewer.
3. Deploy with GitHub Pages or Netlify.
4. Navigate to the live URL; the left panel shows the 360° tour. Right panel buttons appear dynamically based on existing files:
   - **Open IFC** (when `BIM_file.ifc` is present),
   - **Open PDF**,
   - **Open DXF**,
   - **Open 3D Model** (when `model_link.txt` exists) This can potentially be replaced with OBJloader and PCDloader via main.js + three.js bundle.

---

##  Why It Matters

- Offers a lightweight, fully front-end solution—no servers, no database.
- Supports immersive visualization for AEC, asset management, and project review workflows.
- Modular design enables easy extension and integration with additional formats.

---

##  How You Can Help

- Improve usability: better UI, error handling, file detection logic.
- Add features: annotation, measurement tools, synchronized views, version control.
- Port to frameworks: React, Vue, or solidify as an npm package.
- Improve documentation or examples — the community should feel at home here!

---

##  Contributor Benefits (Coming Soon)

We value collaboration and will recognize contributors via:
- Project credits on the main page.
- Invitations to joint dev sprints.
- Access to shared revenue or licenses crafted around this tool.

---

##  License

MIT License — see [LICENSE](LICENSE) for details.

---

Thanks for checking this out! If you're interested in contributing or just exploring, feel free to open an issue or fork the project. Let's build something great together!
