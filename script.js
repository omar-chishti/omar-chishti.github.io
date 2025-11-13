/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WHITE MATTER TRACT EXPLORER
 * An interactive three-dimensional visualization of human neuroanatomy
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This application provides an immersive interface for exploring white matter
 * fiber tracts in the human brain. Utilizing high-resolution 3D models derived
 * from diffusion MRI tractography, users can examine 24 major neural pathways
 * that form the structural connectivity of the brain.
 *
 * Technical Implementation:
 *   - Google Model Viewer (WebGL-based 3D rendering)
 *   - GLB format models (optimized for web delivery)
 *   - Vanilla JavaScript (no framework dependencies)
 *   - LocalStorage for user preferences
 *
 * Author: Omar Chishti
 * Year: 2023
 */

/* ───────────────────────────────────────────────────────────────────────────
   DOM ELEMENT REFERENCES
   ─────────────────────────────────────────────────────────────────────────── */

const modelViewer = document.querySelector('#tract-viewer');
const tractSelect = document.querySelector('#src');
const showBrainCheckbox = document.querySelector('#show-brain');
const darkModeToggle = document.querySelector('#dark-mode');

/* ───────────────────────────────────────────────────────────────────────────
   MODEL RENDERING FUNCTIONS
   ─────────────────────────────────────────────────────────────────────────── */

/**
 * Updates the 3D model based on user-selected tract and overlay preferences.
 *
 * When the brain overlay is enabled, the function loads an alternate version
 * of the tract model that includes a transparent anatomical brain mesh for
 * spatial context.
 *
 * Visual feedback is provided during loading by temporarily disabling the
 * control panel to prevent rapid successive model changes.
 */
function updateModel() {
  const tractValue = tractSelect.value;

  // Provide visual feedback during model loading
  const controlPanel = document.querySelector('#controls');
  controlPanel.style.opacity = '0.6';
  controlPanel.style.pointerEvents = 'none';

  if (showBrainCheckbox.checked) {
    // Load tract model with transparent brain overlay for anatomical context
    modelViewer.src = tractValue.replace('.glb', '.glb_glass.glb');
  } else {
    // Load isolated tract model
    modelViewer.src = tractValue;
  }
}

/**
 * Applies or removes dark mode styling and persists preference.
 *
 * @param {boolean} enabled - Whether dark mode should be activated
 *
 * Dark mode provides optimal viewing in low-light environments and reduces
 * eye strain during extended viewing sessions.
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
 * Handles progressive loading feedback via animated progress bar.
 *
 * @param {CustomEvent} event - Model-viewer progress event
 *
 * The progress bar provides visual feedback during model loading, which is
 * particularly important for larger models on slower connections.
 */
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;

  if (event.detail.totalProgress === 1) {
    // Hide progress bar when loading completes
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    // Ensure progress bar is visible during loading
    progressBar.classList.remove('hide');
  }
};

/* ───────────────────────────────────────────────────────────────────────────
   EVENT LISTENERS: Model viewer and controls
   ─────────────────────────────────────────────────────────────────────────── */

tractSelect.addEventListener('input', updateModel);
showBrainCheckbox.addEventListener('change', updateModel);
darkModeToggle.addEventListener('change', () => applyDarkMode(darkModeToggle.checked));
modelViewer.addEventListener('progress', onProgress);

// Re-enable control panel after model loads
modelViewer.addEventListener('load', () => {
  const controlPanel = document.querySelector('#controls');
  controlPanel.style.opacity = '1';
  controlPanel.style.pointerEvents = 'auto';
});

/* ───────────────────────────────────────────────────────────────────────────
   MODAL DIALOG FUNCTIONALITY
   ─────────────────────────────────────────────────────────────────────────── */

const infoButton = document.querySelector('#info-button');
const infoModal = document.querySelector('#info-modal');
const modalClose = document.querySelector('.modal-close');

/**
 * Opens the information modal dialog.
 *
 * Displays project information, controls documentation, and keyboard shortcuts.
 * Prevents body scrolling while modal is open to maintain user focus.
 */
function openModal() {
  infoModal.classList.add('active');
  infoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Closes the information modal dialog.
 *
 * Restores body scrolling and returns focus to the main visualization.
 */
function closeModal() {
  infoModal.classList.remove('active');
  infoModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; // Restore scrolling
}

/* ───────────────────────────────────────────────────────────────────────────
   EVENT LISTENERS: Modal interactions
   ─────────────────────────────────────────────────────────────────────────── */

// Info button in control panel
if (infoButton) {
  infoButton.addEventListener('click', openModal);
}

// Close button within modal
if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

// Close modal when clicking outside content area (backdrop click)
if (infoModal) {
  infoModal.addEventListener('click', (e) => {
    if (e.target === infoModal) {
      closeModal();
    }
  });
}

/* ───────────────────────────────────────────────────────────────────────────
   KEYBOARD SHORTCUTS
   ─────────────────────────────────────────────────────────────────────────── */

/**
 * Global keyboard shortcuts for enhanced usability:
 *
 *   i / ?  — Open/close information modal
 *   Esc    — Close modal (standard dialog behavior)
 *   d      — Toggle dark mode
 *   b      — Toggle brain overlay
 *
 * Shortcuts are disabled when modal is open (except Esc) to prevent
 * unintended interactions.
 */
document.addEventListener('keydown', (e) => {
  // Escape key: Close modal
  if (e.key === 'Escape' && infoModal.classList.contains('active')) {
    closeModal();
  }

  // 'i' or '?' key: Open information modal
  if ((e.key === 'i' || e.key === '?') && !infoModal.classList.contains('active')) {
    openModal();
  }

  // 'd' key: Toggle dark mode
  if (e.key === 'd' && !infoModal.classList.contains('active')) {
    darkModeToggle.checked = !darkModeToggle.checked;
    applyDarkMode(darkModeToggle.checked);
  }

  // 'b' key: Toggle brain overlay
  if (e.key === 'b' && !infoModal.classList.contains('active')) {
    showBrainCheckbox.checked = !showBrainCheckbox.checked;
    updateModel();
  }
});

/* ───────────────────────────────────────────────────────────────────────────
   INITIALIZATION
   ─────────────────────────────────────────────────────────────────────────── */

/**
 * Restores user preferences from previous session on page load.
 *
 * Dark mode preference is persisted in localStorage to maintain consistent
 * viewing experience across sessions.
 */
document.addEventListener('DOMContentLoaded', () => {
  const savedDarkMode = localStorage.getItem('dark-mode');

  // Apply saved dark mode preference, or default to checkbox state
  if (savedDarkMode === 'true' || (savedDarkMode === null && darkModeToggle.checked)) {
    document.body.classList.add('dark-mode');
  }
});
