import { useLocation, Link } from "react-router-dom";
import { FaFileAlt, FaBriefcase, FaHeart, FaInfoCircle, FaNewspaper } from "react-icons/fa";

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      icon: FaFileAlt,
      label: "Resume",
    },
    {
      path: "/projects",
      icon: FaBriefcase,
      label: "Portfolio",
    },
    {
      path: "/skills",
      icon: FaHeart,
      label: "Interests",
    },
    {
      path: "/about",
      icon: FaInfoCircle,
      label: "About",
    },
    {
      path: "/contact",
      icon: FaNewspaper,
      label: "Posts",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50 md:hidden">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 min-w-0 flex-1 transition-colors ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <IconComponent 
                size={20} 
                className={`mb-1 ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`} 
              />
              <span className={`text-xs font-medium ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;