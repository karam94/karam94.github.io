/**
 * Custom Cursor Effect
 *
 * Accessibility-enhanced cursor that respects:
 * - Touch devices (pointer: coarse)
 * - Reduced motion preference
 * - Keyboard navigation (hides cursor when keyboard is detected)
 */

export function initCursor() {
  // Don't initialize if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Don't initialize on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    return;
  }

  // Track input method for accessibility
  let usingKeyboard = false;
  let usingMouse = false;

  const handleKeyDown = () => {
    usingKeyboard = true;
    usingMouse = false;
    document.body.classList.add('using-keyboard');
    document.body.classList.remove('using-mouse');
  };

  const handleMouseDown = () => {
    usingKeyboard = false;
    usingMouse = true;
    document.body.classList.add('using-mouse');
    document.body.classList.remove('using-keyboard');
  };

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('mousedown', handleMouseDown);

  // Don't show cursor if keyboard is being used
  if (usingKeyboard) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Ensure cursor shows when mouse moves
    if (!usingMouse) {
      handleMouseDown();
    }
  });

  function animate() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animate);
  }

  animate();
}
