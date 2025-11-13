# White Matter Tract Explorer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://omar-chishti.github.io/)

An interactive 3D visualization tool for exploring anatomical white matter tracts in the human brain. Built in 2023 as an educational neuroscience project.

![White Matter Tract Explorer](tractograms_final.png)

## Overview

This web-based application provides an interactive interface for viewing and manipulating 3D models of 25+ white matter tracts. Built using Google's Model Viewer web component, it enables users to explore neuroanatomical structures through an intuitive browser interface with support for augmented reality on compatible devices.

## Features

- **Interactive 3D Visualization**: Rotate, zoom, and pan through 25+ white matter tract models
- **Brain Overlay**: Toggle transparent brain anatomy for anatomical context
- **Dark Mode**: Optimized viewing experience for different lighting conditions
- **Augmented Reality**: View models in physical space on compatible devices
- **Responsive Design**: Seamless experience across desktop and mobile platforms

## Technical Stack

- HTML5
- CSS3
- Vanilla JavaScript
- [Google Model Viewer](https://modelviewer.dev/) (Web Component)
- GLB (GL Transmission Format) 3D models
- Blender (for creating models)
- DSI Studio (for processing difussion MRI data)

## Live Demo

Visit the live application: **[https://omar-chishti.github.io](https://omar-chishti.github.io)**

## Usage

### Mouse/Touch Controls
- **Rotate**: Click and drag (or touch and drag)
- **Zoom**: Scroll wheel (or pinch gesture)
- **Pan**: Right-click and drag (or two-finger drag)

### Interface Controls
- **Tract Selector Dropdown**: Choose from 25+ available white matter tracts
- **Show Brain Toggle**: Display transparent brain overlay for anatomical context
- **Dark Mode Toggle**: Switch between light and dark themes
- **AR Button**: Launch augmented reality view (mobile devices with ARCore/ARKit)
- **Info Button**: Access detailed information about the project

### Keyboard Shortcuts
- `i` or `?` - Open info modal
- `Esc` - Close modal
- `d` - Toggle dark mode
- `b` - Toggle brain overlay

## Available White Matter Tracts

The explorer includes 25+ major white matter pathways:

### Association Tracts (Same Hemisphere)
- Arcuate Fasciculus (L_AF)
- Uncinate Fasciculus (L_UF)
- Inferior Frontooccipital Fasciculus (L_IFOF)
- Inferior Longitudinal Fasciculus (L_ILF)
- Middle Longitudinal Fasciculus (L_mLF)
- Superior Longitudinal Fasciculus (L_SLF)
- Vertical Occipital Fasciculus (L_VOF)
- Frontal Aslant Tract (L_FAT)
- Cingulum (L_CG)
- Extreme Capsule (L_EMC)

### Commissural Tracts (Between Hemispheres)
- Corpus Callosum (CC)
- Anterior Commissure (AC)

### Projection Tracts (Cortical-Subcortical)
- Corticospinal Tract (CST_L)
- Corticobulbar Tract (CBT_L)
- Corticopontine Tract (CPT_L)
- Corticostriatal Tract (CS_L)
- Optic Radiation (OR_L)
- Acoustic Radiation (AR_L)
- Thalamic Radiation (TR_L)
- And more...

## File Structure

```
omar-chishti.github.io/
├── index.html                    # Main application page
├── styles.css                    # Complete stylesheet
├── script.js                     # Application logic & interactivity
├── README.md                     # This file
├── LICENSE                       # MIT License
├── demo.html                     # Alternative demo page
├── UFslider.html                 # Slider-based viewer
├── yale_brain_atlas_demo.html   # Yale Brain Atlas with annotations
├── *.glb                        # 3D tract model files (~30 models)
├── *_glass.glb                  # Transparent brain overlay models
├── tractograms_final.png        # Preview image
├── ar_icon.png                  # AR button icon
└── poster.webp                  # Loading poster
```

## Browser Compatibility

- ✅ Chrome/Edge 90+ (recommended for best performance)
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ Mobile Chrome/Safari (iOS 12+, Android 8+)
- ✅ AR support: ARCore (Android) and ARKit (iOS) compatible devices

## Development & Contribution

This project was developed in 2023 using vanilla HTML, CSS, and JavaScript for maximum compatibility and performance.

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/omar-chishti/omar-chishti.github.io.git
   ```
2. Serve locally (Python example):
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser

## Data Attribution

3D tract models are derived from high-resolution diffusion MRI tractography data from the [Human Connectome Project](https://www.humanconnectome.org/). This visualization tool is intended for educational and research purposes only.

## Project Context

Developed in 2023 as a web-based educational tool for neuroscience students, researchers, and anyone interested in learning about brain anatomy. The project demonstrates the power of modern web technologies (WebGL, Web Components) for scientific visualization.

## License

MIT License - See [LICENSE](LICENSE) file for details.

Copyright (c) 2023 Omar Chishti

## Acknowledgments

- Human Connectome Project for tractography data
- Google Model Viewer team for the excellent 3D viewer component
- DSI Studio
- The neuroscience and neuroimaging communities

---

**Built for neuroscience education.**
