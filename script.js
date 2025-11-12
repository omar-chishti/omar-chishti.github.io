/**
 * White Matter Tract Explorer
 * Interactive 3D visualization of brain white matter tracts
 */

// DOM element references
const modelViewer = document.querySelector('#tract-viewer');
const tractSelect = document.querySelector('#src');
const showBrainCheckbox = document.querySelector('#show-brain');
const darkModeToggle = document.querySelector('#dark-mode');

/**
 * Update the displayed 3D model based on user selections
 */
function updateModel() {
  const tractValue = tractSelect.value;
  
  if (showBrainCheckbox.checked) {
    // Show tract with glass brain overlay
    modelViewer.src = tractValue.replace('.glb', '.glb_glass.glb');
  } else {
    // Show tract only
    modelViewer.src = tractValue;
  }
}

/**
 * Apply or remove dark mode styling
 */
function applyDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('dark-mode', 'true');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('dark-mode', 'false');
  }
}

/**
 * Handle progress bar updates during model loading
 */
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};

// Event listeners
tractSelect.addEventListener('input', updateModel);
showBrainCheckbox.addEventListener('change', updateModel);
darkModeToggle.addEventListener('change', () => applyDarkMode(darkModeToggle.checked));
modelViewer.addEventListener('progress', onProgress);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Restore dark mode preference
  const savedDarkMode = localStorage.getItem('dark-mode');
  if (savedDarkMode === 'true' || (savedDarkMode === null && darkModeToggle.checked)) {
    document.body.classList.add('dark-mode');
  }
});
