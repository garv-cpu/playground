// src/components/ThemeToggle.jsx
const ThemeToggle = ({ theme, setTheme }) => {
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    );
  };
  
  export default ThemeToggle;