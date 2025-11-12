# White Matter Tract Explorer

Interactive 3D visualization tool for exploring anatomical white matter tracts in the human brain.

## Overview

This web-based application provides an interactive interface for viewing and manipulating 3D models of white matter tracts. Built using Google's Model Viewer web component, it enables users to explore neuroanatomical structures through an intuitive browser interface.

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

## Usage

The application is deployed via GitHub Pages and accessible at:  
`https://omar-chishti.github.io`

### Controls

- **Mouse/Touch**: Rotate, zoom, and pan the 3D model
- **Tract Selector**: Choose from available white matter tracts
- **Show Brain**: Toggle anatomical brain overlay
- **Dark Mode**: Switch between light and dark themes
- **AR Button**: Launch augmented reality view (mobile devices)

## File Structure

```
├── index.html          # Main application
├── styles.css          # Stylesheet
├── script.js           # Application logic
├── *.glb              # 3D model files
└── ar_icon.png        # AR button icon
```

## Browser Compatibility

- Chrome/Edge (recommended)
- Safari
- Firefox
- Mobile browsers with WebXR support

## Data Attribution

3D models are derived from diffusion MRI tractography data from the Human Connectome Project. This visualization tool is intended for educational and research purposes.

## License

MIT License - See LICENSE file for details
