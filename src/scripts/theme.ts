// Theme initialization — the data-theme attribute is set by an inline script in <head>
// before this module runs, so we only need to ensure localStorage is populated and
// register the system preference listener.
export function initTheme() {
  // Populate localStorage on first visit so toggleTheme() always has a value to read
  if (!localStorage.getItem('theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
  }

  // Listen for system theme changes (only applies when user hasn't set a preference)
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);

  // Dispatch custom event for other components
  window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: next } }));
}
