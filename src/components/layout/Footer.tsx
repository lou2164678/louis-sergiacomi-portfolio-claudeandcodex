import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Louis Amelio Sergiacomi</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              B2B Sales & Account Management Expert | AI & Technology Advocate
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Tempe, Arizona • 209+ LinkedIn Connections • #OPEN_TO_WORK
            </p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://linkedin.com/in/louduko"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="mailto:lou@sergiacomi.me"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            &copy; {currentYear} Louis Amelio Sergiacomi. All rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Data-Driven Sales Strategist | Analytical B2B Sales Leader
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
