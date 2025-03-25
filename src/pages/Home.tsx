import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                Hi, I'm <span className="text-blue-600 dark:text-blue-400">Lou Sergiacomi</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6">
                B2B Sales & AI Technology Professional
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Dynamic sales professional with over 6 years of experience in business sales, account management, and customer service. Specializing in B2B sales, consultative selling, and leveraging AI technology to optimize sales processes and drive revenue growth.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/projects"
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
                >
                  View My Work
                  <FaArrowRight className="ml-2" />
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                >
                  Contact Me
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gray-200 dark:bg-gray-700 h-80 rounded-lg overflow-hidden">
                {/* Replace with your professional photo when available */}
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Professional Photo 
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Current Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, title: "AI Sales Ninja", description: "AI-powered sales assistant to enhance sales performance and streamline customer interactions." },
              { id: 2, title: "AI for Candidates", description: "Platform leveraging AI to help job candidates improve their application and interview process." },
              { id: 3, title: "LLM Wrapper", description: "Custom large language model wrapper for specialized business applications." }
            ].map((item) => (
              <motion.div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item.id * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-200 dark:bg-gray-700 h-48 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Project Image
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {item.description}
                  </p>
                  <Link
                    to={`/projects/${item.id}`}
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center"
                  >
                    View Project
                    <FaArrowRight className="ml-2" size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 inline-flex items-center"
            >
              View All Projects
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Metrics Section */}
      <section className="py-10 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-600 dark:text-blue-400 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">AI</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">4 years</p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-600 dark:text-blue-400 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">B2B Sales</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">6+ years</p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-600 dark:text-blue-400 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">SaaS</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">3 years</p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-600 dark:text-blue-400 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Account Management</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">5+ years</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Let's Work Together
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            I'm currently available for new opportunities. If you're looking for someone who combines analytical thinking with sales expertise and a passion for AI technology, let's connect.
          </p>
          <Link
            to="/contact"
            className="px-8 py-4 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors duration-300 inline-flex items-center font-medium"
          >
            Get in Touch
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;