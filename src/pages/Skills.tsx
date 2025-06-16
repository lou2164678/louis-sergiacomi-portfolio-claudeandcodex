import { motion } from "framer-motion";

// Skill data based on LinkedIn profile and experience
const skillsData = {
  sales: [
    { name: "Sales Processes", level: 95 },
    { name: "B2B Sales", level: 95 },
    { name: "Account Management", level: 92 },
    { name: "Upselling/Cross-selling", level: 94 },
    { name: "Operations Management", level: 90 },
    { name: "Client Relationship Management", level: 92 },
    { name: "Territory Management", level: 88 },
    { name: "Quota Achievement", level: 95 },
  ],
  technical: [
    { name: "Reasoning Skills", level: 90 },
    { name: "Problem Solving", level: 92 },
    { name: "Data Analysis", level: 85 },
    { name: "AI Principles", level: 80 },
    { name: "Tech-Savvy Solutions", level: 85 },
    { name: "CRM Systems", level: 88 },
  ],
  business: [
    { name: "Business Development", level: 90 },
    { name: "Go-to-Market Strategy", level: 88 },
    { name: "Revenue Growth Planning", level: 92 },
    { name: "Strategic Planning", level: 88 },
    { name: "Pipeline Management", level: 90 },
    { name: "Performance Metrics", level: 85 },
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
            Professional Skills & Expertise
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto">
            With over 7 years of proven sales excellence and expertise in AI & technology integration, I've developed 
            a comprehensive skill set spanning advanced sales processes, analytical problem-solving, and strategic business development. 
            My unique combination of data-driven thinking and consultative selling has consistently delivered results exceeding 160% of quota targets.
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b border-blue-200 dark:border-blue-700">
              Sales Excellence
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b border-blue-200 dark:border-blue-700">
              Analytical & Technical
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b border-blue-200 dark:border-blue-700">
              Strategic Leadership
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
                Business Education & Athletics
              </h3>
              <p className="text-blue-600 dark:text-blue-400 mb-4">
                Mesa Community College, 2010-2012
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Business/Commerce studies with scholarship collegiate baseball. Ranked #3 in Nation (2012), NJCAA Baseball World Champions (2014) as Volunteer Assistant Coach.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                AI & Technology Focus
              </h3>
              <p className="text-blue-600 dark:text-blue-400 mb-4">
                Emerging Technologies
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Keen interest in AI and emerging technologies. Staying current with latest trends in AI application for sales and customer engagement, leveraging technology to drive performance optimization.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
