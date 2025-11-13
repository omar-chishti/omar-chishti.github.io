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

  // Visual feedback that loading is happening
  const controlPanel = document.querySelector('#controls');
  controlPanel.style.opacity = '0.6';
  controlPanel.style.pointerEvents = 'none';
  
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
// Re-enable controls when loaded
modelViewer.addEventListener('load', () => {
  const controlPanel = document.querySelector('#controls');
  controlPanel.style.opacity = '1';
  controlPanel.style.pointerEvents = 'auto';
});

/**
 * Modal functionality
 */
const infoButton = document.querySelector('#info-button');
const infoModal = document.querySelector('#info-modal');
const modalClose = document.querySelector('.modal-close');

function openModal() {
  infoModal.classList.add('active');
  infoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  infoModal.classList.remove('active');
  infoModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Modal event listeners
if (infoButton) {
  infoButton.addEventListener('click', openModal);
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

// Close modal when clicking outside content
if (infoModal) {
  infoModal.addEventListener('click', (e) => {
    if (e.target === infoModal) {
      closeModal();
    }
  });
}

/**
 * Keyboard shortcuts
 */
document.addEventListener('keydown', (e) => {
  // Escape key closes modal
  if (e.key === 'Escape' && infoModal.classList.contains('active')) {
    closeModal();
  }

  // 'i' or '?' key opens info modal
  if ((e.key === 'i' || e.key === '?') && !infoModal.classList.contains('active')) {
    openModal();
  }

  // 'd' key toggles dark mode
  if (e.key === 'd' && !infoModal.classList.contains('active')) {
    darkModeToggle.checked = !darkModeToggle.checked;
    applyDarkMode(darkModeToggle.checked);
  }

  // 'b' key toggles brain overlay
  if (e.key === 'b' && !infoModal.classList.contains('active')) {
    showBrainCheckbox.checked = !showBrainCheckbox.checked;
    updateModel();
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Restore dark mode preference
  const savedDarkMode = localStorage.getItem('dark-mode');
  if (savedDarkMode === 'true' || (savedDarkMode === null && darkModeToggle.checked)) {
    document.body.classList.add('dark-mode');
  }
});
