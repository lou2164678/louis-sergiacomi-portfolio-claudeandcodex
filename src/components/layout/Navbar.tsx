import { Link } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Mobile: Just name and theme toggle */}
        <div className="md:hidden flex justify-between items-center w-full">
          <Link to="/" className="text-lg font-bold text-gray-800 dark:text-white">
            Louis Sergiacomi
          </Link>
          <ThemeToggle />
        </div>

        {/* Desktop: Full navigation */}
        <div className="hidden md:flex justify-between items-center w-full">
          <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            Louis Sergiacomi
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              Resume
            </Link>
            <Link to="/projects" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              Portfolio
            </Link>
            <Link to="/skills" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              Interests
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
