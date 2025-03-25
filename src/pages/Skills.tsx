import { motion } from "framer-motion";

// Skill data
const skillsData = {
  sales: [
    { name: "B2B Sales", level: 95 },
    { name: "Account Management", level: 90 },
    { name: "Upselling/Cross-selling", level: 92 },
    { name: "Pipeline Management", level: 88 },
    { name: "Sales Process Optimization", level: 85 },
    { name: "Client Relationship Management", level: 90 },
    { name: "Sales Analytics", level: 85 },
    { name: "Quota Achievement", level: 92 },
  ],
  technical: [
    { name: "AI Integration", level: 85 },
    { name: "SaaS Solutions", level: 80 },
    { name: "CRM Systems", level: 90 },
    { name: "Sales Technology", level: 85 },
    { name: "Data Analysis", level: 80 },
  ],
  business: [
    { name: "Business Development", level: 88 },
    { name: "Market Analysis", level: 85 },
    { name: "Go-to-Market Strategy", level: 85 },
    { name: "Revenue Growth Planning", level: 90 },
    { name: "Territory Management", level: 85 },
  ],
};

const SkillBar = ({ name, level }: { name: string; level: number }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-gray-700 dark:text-gray-300 font-medium">{name}</span>
        <span className="text-gray-600 dark:text-gray-400">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <motion.div
          className="bg-blue-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
            My Skills
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto">
            With over 12 years in sales and a strong focus on technology integration, I've developed a diverse
            skill set spanning sales expertise, technical knowledge, and business strategy. Here's an overview
            of my professional capabilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Sales Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Sales Skills
            </h2>
            <div>
              {skillsData.sales.map((skill, index) => (
                <SkillBar key={index} name={skill.name} level={skill.level} />
              ))}
            </div>
          </motion.div>

          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Technical Skills
            </h2>
            <div>
              {skillsData.technical.map((skill, index) => (
                <SkillBar key={index} name={skill.name} level={skill.level} />
              ))}
            </div>
          </motion.div>

          {/* Business Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md lg:col-span-1 md:col-span-2"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Business Strategy
            </h2>
            <div>
              {skillsData.business.map((skill, index) => (
                <SkillBar key={index} name={skill.name} level={skill.level} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Industry Experience */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-blue-50 dark:bg-gray-750 p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Industry Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            My career has spanned multiple industries, giving me a well-rounded perspective on sales and business development:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Technology & SaaS
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Experience with B2B tech sales at GoDaddy and implementing AI solutions for sales teams.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Digital Marketing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                B2B advertising and marketing experience at Yelp, helping businesses optimize their online presence.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Consumer Goods
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sales and distribution experience at Bimbo Bakeries and Snyder's Lance, managing key accounts and optimizing sales processes.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Certifications & Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                AHIP Certification
              </h3>
              <p className="text-blue-600 dark:text-blue-400 mb-4">
                Healthcare Insurance Professional
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Certification for professionals in the health insurance industry, demonstrating expertise in Medicare and related products.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Arizona Producer's License
              </h3>
              <p className="text-blue-600 dark:text-blue-400 mb-4">
                Insurance Sales
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Licensed to sell insurance products in Arizona, with additional licensing in multiple states.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                College Education
              </h3>
              <p className="text-blue-600 dark:text-blue-400 mb-4">
                Mesa Community College, 2010-2012
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Studies focused on business and communications, providing a foundation for a successful sales career.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Professional Development
              </h3>
              <p className="text-blue-600 dark:text-blue-400 mb-4">
                Ongoing Learning
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Continuous professional development in AI, sales methodologies, and business strategy through workshops, online courses, and industry conferences.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
