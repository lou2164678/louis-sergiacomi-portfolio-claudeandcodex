import { motion } from "framer-motion";
import { FaLaptopCode, FaServer, FaPencilRuler, FaMobileAlt } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* About Me Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
            About Me
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/3">
              <div className="bg-gray-200 dark:bg-gray-700 h-80 w-full rounded-lg overflow-hidden">
                {/* Replace with your professional photo when available */}
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Professional Photo
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                I'm <span className="text-blue-600 dark:text-blue-400">Lou Sergiacomi</span>, a B2B Sales & AI Technology Professional
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                As an INTP personality type and Enneagram Type 5 "Thinker," I bring a highly analytical, logical, and innovative approach to sales. I excel at understanding complex problems and finding unique solutions through data-driven strategies and creative thinking.
              </p>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                With over 6 years of experience in business sales, account management, and customer service, I'm passionate about leveraging AI technology to optimize sales processes. My approach combines technical knowledge with consultative selling techniques to drive revenue growth.
              </p>

              <p className="text-gray-600 dark:text-gray-300">
                Currently based in Fountain Hills, AZ, I focus on B2B sales, specializing in SaaS solutions and AI integration. My analytical mindset and emotional stability make me particularly effective at navigating complex sales scenarios and building long-term client relationships.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            My Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                <FaLaptopCode size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Sales Expertise
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Driving revenue growth through strategic sales initiatives.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• B2B Sales</li>
                <li>• Account Management</li>
                <li>• Consultative Selling</li>
                <li>• Cross-selling & Upselling</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                <FaServer size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Technical Skills
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Leveraging technology for enhanced sales performance.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• AI Principles</li>
                <li>• Data Analysis</li>
                <li>• Salesforce CRM</li>
                <li>• Prompt Engineering</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                <FaPencilRuler size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Customer Service
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Building strong relationships with clients.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Relationship Building</li>
                <li>• Technical Support</li>
                <li>• Needs Assessment</li>
                <li>• Problem Solving</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                <FaMobileAlt size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Business Strategy
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Developing and implementing effective growth strategies.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Sales Process Optimization</li>
                <li>• Performance Metrics</li>
                <li>• Forecasting</li>
                <li>• Revenue Growth</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Work Experience
          </h2>

          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Business Sales
                </h3>
                <span className="text-gray-600 dark:text-gray-300">
                  Sep 2020 - Nov 2021
                </span>
              </div>
              <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                GoDaddy - Gilbert, AZ
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Led B2B sales initiatives, excelling in upselling and cross-selling to boost client performance. Provided high-quality inbound tech support, with an emphasis on utilizing AI tools for customer engagement and problem-solving. Managed complex sales scenarios and customer inquiries.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Account Executive
                </h3>
                <span className="text-gray-600 dark:text-gray-300">
                  Mar 2019 - Mar 2020
                </span>
              </div>
              <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                Yelp - Phoenix, AZ
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Managed B2B advertising and marketing with businesses sized 1-9 locations. Connected local businesses with clients through targeted B2B Yelp Ads. Achieved a lifetime quota revenue of over 105% through strategic planning and effective pipeline management. Consistently exceeded sales targets with 159% in Sep '19, 156% in Oct '19, and 166% in Jan '20.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Sales Representative
                </h3>
                <span className="text-gray-600 dark:text-gray-300">
                  Apr 2014 - Mar 2016
                </span>
              </div>
              <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                Snyder's Lance - Mesa, AZ
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Increased yearly territory sales by over 18% through data-driven market analysis and targeted growth strategies. Expanded total accounts by 10% by identifying and pursuing new business opportunities. Managed ordering, delivering, and merchandising, improving product availability and maintaining consistent product availability and customer satisfaction.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;