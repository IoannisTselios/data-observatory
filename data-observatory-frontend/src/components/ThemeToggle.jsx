function ThemeToggle({ theme, onToggleTheme }) {
  const nextThemeLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggleTheme}
      aria-label={nextThemeLabel}
    >
      <span className="theme-toggle-label">Theme</span>
      <span className="theme-toggle-value">{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  )
}

export default ThemeToggle
