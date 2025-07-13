import { Link,  useLocation
 } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const { pathname } = useLocation();
    const { darkMode, setDarkMode} = useTheme();
    const toggleTheme = () => setDarkMode((prev)=>!prev);

    const navLinkStyle = (path) =>
        `px-3 py-2 rounded ${
        pathname === path
        ? "bg-blue-600 text-white"
        : "text-grey-700 hover:bg-blue-100"
    }`;

    return(
        <nav className="bg-white dark:bggray-800 border-b shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-700 dark:text-white"> Forex Tracker</h1>
                
                <div className="flex items-center gap-4">
                    <Link to="/" className="text-gray-700 dark:text-gray-200 hover:underline">
                    Trading Rates
                    </Link>
                    <Link to="/tasks" className="text-gray-700 dark:text-gray-200 hover:underline">
                    Journal
                    </Link>
                    <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:underline">
                    About
                    </Link>

                    <button onClick={toggleTheme}
                        className="text-sm bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded">
                            {darkMode ? "LIGHT" : "DARK"}
                    </button>
                </div>
            </div>
        </nav>
    );
};


export default Navbar;