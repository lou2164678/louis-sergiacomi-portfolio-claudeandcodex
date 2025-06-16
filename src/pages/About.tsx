import { motion } from "framer-motion";
import { FaLaptopCode, FaServer, FaPencilRuler, FaMobileAlt, FaChartLine, FaBrain, FaHandshake, FaCog } from "react-icons/fa";

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
                I'm <span className="text-blue-600 dark:text-blue-400">Louis Amelio Sergiacomi</span>, a Data-Driven Sales Strategist
              </h2>
              
              <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-4">
                B2B Sales & Account Management Expert | AI & Technology Advocate | Revenue Growth Specialist
              </p>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                As an INTP personality type and Enneagram Type 5 "Thinker," I combine analytical insight, relentless curiosity, and authentic integrity to consistently exceed targets and drive business growth. My DISC profile as a "Skeptic (Cd)" means I bring logical, deliberate decision-making to every sales scenario, with high emotional stability (70%) that keeps me calm under pressure.
              </p>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                With 7+ years of proven sales excellence across multiple industries, I've achieved remarkable results: 166% of quota at Yelp, 18% territory growth at Snyder's-Lance, and led premium domain sales at GoDaddy. My approach leverages data analysis, process optimization, and consultative selling to build lasting client relationships.
              </p>

              <p className="text-gray-600 dark:text-gray-300">
                Dynamic Sales Professional with over 7 years of experience in business sales, account management, and customer service. Expert in B2B sales, upselling, cross-selling, and technical support. Currently based in Tempe, Arizona, I'm passionate about leveraging AI and technology to drive sales and customer engagement, committed to delivering customer-driven solutions with a blend of sales acumen and tech-savvy approach.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Core Strengths & Values Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Core Strengths & Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
                <FaBrain size={40} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                Love of Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Passionate about building knowledge and continuously seeking to deepen expertise, whether mastering a product or exploring new sales methodologies.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
                <FaHandshake size={40} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                Honesty & Integrity
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Straightforward and authentic, taking responsibility for actions. Colleagues and clients trust that I present things sincerely, even when uncomfortable.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
                <FaLaptopCode size={40} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                Creativity & Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Finding unique ways to solve problems and generate useful ideas, thinking outside the box rather than sticking to "how it's always been done."
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
                <FaChartLine size={40} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                Curiosity & Exploration
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Open to new experiences and interested in new activities, ideas, and people. Always looking to refine approaches and try innovative sales tools.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Personal Values That Drive Excellence
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Scientific Understanding</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Using logical principles and data to solve problems, preferring evidence-based decisions over gut feeling.</p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Achievement & Growth</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Challenging myself and working hard to improve, being self-motivated by progress and success.</p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Responsibility & Humility</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Being dependable and trustworthy while staying humble about accomplishments, letting results speak for themselves.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Unique Value Propositions Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Unique Value Propositions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                <FaChartLine size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Data-Driven Deal Closer
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                I combine analytical prowess with sales savvy to consistently drive revenue. Using performance metrics, market research, and CRM analytics, I routinely exceed targets by up to 166% of quota through evidence-based strategies that build client credibility.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                <FaCog size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Independent Problem Solver
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                I thrive with autonomy to innovate solutions. My proactive approach led to 20% labor cost reduction and 7% waste reduction through self-initiated process improvements that benefited entire teams.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                <FaBrain size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Continuous Learner & Innovator
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                My curiosity drives constant improvement and rapid adaptation. I quickly master new industries and technologies, from obtaining multi-state insurance licenses to leading premium domain sales through deep product knowledge.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                <FaHandshake size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Trust-Building Through Honesty
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                My authentic, consultative approach turns prospects into long-term partners. By leading with integrity and customizing solutions to client needs, I achieve higher retention rates and earn valuable referrals.
              </p>
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
            Professional Experience
          </h2>

          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Sales Lead Manager
                </h3>
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  Dec 2021 - Present
                </span>
              </div>
              <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                Bimbo Bakeries USA - Arizona
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Leading strategic sales initiatives and team development for a major consumer goods company. Develop regional growth plans and mentor frontline sales teams to achieve ambitious revenue targets.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-sm">
                <li>• Create store-level growth plans tied to zone objectives (revenue, freshness, market share)</li>
                <li>• Execute growth opportunities for strategic brands via incremental displays and shelf space</li>
                <li>• Utilize sales data and analytics to drive effective decision-making across teams</li>
                <li>• Bridge high-level strategy with day-to-day execution through cross-functional coordination</li>
              </ul>
            </div>

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
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Specialized in upselling and cross-selling to upgrade client performance while providing exceptional technical support.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-sm">
                <li>• Upselling current products and services to upgrade client performance</li>
                <li>• Provided high-quality inbound tech support, utilizing internal tools for customer engagement and problem-solving</li>
                <li>• Cross-selling current clients on additional services</li>
                <li>• Led team in highest dollar value of premium domain sales</li>
              </ul>
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
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Personally set up ad campaigns and CTAs for clients, tailoring strategies to their specific needs and ensuring optimal performance.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-sm">
                <li>• Surpassed lifetime quota revenue by 105% through strategic planning and effective pipeline management</li>
                <li>• Recognized as top team performer in 4 separate months by exceeding KPI targets</li>
                <li>• Maintained 80+ daily calls, delivered 2+ pitches per day, and sustained 2 hours of talk time</li>
                <li>• Achieved exceptional performance: 159% quota (Sep '19), 156% (Oct '19), 166% (Jan '20)</li>
                <li>• Maintained nearly 40% close rate on pitched accounts through strategic qualifying and objection-handling</li>
                <li>• Reduced clawbacks and increased client retention through tailored campaign strategies</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Licensed Insurance Broker
                </h3>
                <span className="text-gray-600 dark:text-gray-300">
                  Aug 2018 - Mar 2019
                </span>
              </div>
              <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                HealthPlanOne - Gilbert, AZ
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Rapidly mastered complex insurance regulations to sell Medicare Advantage and Supplement plans in a highly regulated environment.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-sm">
                <li>• Achieved AHIP certification and obtained licenses to sell Medicare products in 11 states</li>
                <li>• Generated new business by selling Medicare Advantage and Supplement plans to eligible clients</li>
                <li>• Expanded revenue streams by cross-selling ancillary products including dental, vision, and indemnity policies</li>
                <li>• Consistently met or exceeded monthly sales targets through effective client consultations and product knowledge</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Outside Sales Representative
                </h3>
                <span className="text-gray-600 dark:text-gray-300">
                  Mar 2016 - Aug 2018
                </span>
              </div>
              <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                Bimbo Bakeries USA - Arizona
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Managed product supply utilizing data forecasting tools for efficient inventory management and waste reduction.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-sm">
                <li>• Achieved 10% increase in inventory accuracy through strategic inventory management</li>
                <li>• Consistently met sales and shrink goals, reducing waste by 7%</li>
                <li>• Implemented task-efficient system, reducing labor costs by 20% and improving overall productivity</li>
                <li>• Delegated daily delivery trucks, merchandised products, forecasted sales a week in advance</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Independent Sales Representative
                </h3>
                <span className="text-gray-600 dark:text-gray-300">
                  Apr 2014 - Mar 2016
                </span>
              </div>
              <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                Snyder's-Lance, Inc. - Arizona
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Built foundation in territory management and direct store delivery sales with well-known snack and bakery products. Developed core account management skills.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-sm">
                <li>• Increased yearly territory sales by 18% through data-driven market analysis</li>
                <li>• Grew account base by 10% through proactive business development</li>
                <li>• Maintained relationships with 20+ retail accounts</li>
                <li>• Handled order taking, delivery, and merchandising operations</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Sports Training Instructor
                </h3>
                <span className="text-gray-600 dark:text-gray-300">
                  2013 - 2014
                </span>
              </div>
              <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                Extra Innings - Arizona
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Leveraged background as scholarship collegiate athlete to provide one-on-one coaching. Translated MLB-level techniques into actionable training for young athletes, developing skills in teaching, patience, and breaking down complex concepts.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Education & Athletics
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Business/Commerce, General
                </h3>
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  2010 - 2012
                </span>
              </div>
              <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                Mesa Community College - Arizona
              </h4>
              
              <div className="mb-4">
                <h5 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Athletic Achievements - Mesa Community College Baseball
                </h5>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2 mt-1">🏆</span>
                    <span><strong>Ranked #3 in Nation (2012)</strong> - As scholarship collegiate athlete</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2 mt-1">🥇</span>
                    <span><strong>NJCAA Baseball World Champions (2014)</strong> - Volunteer Assistant Coach (Fall 2013)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-silver-500 mr-2 mt-1">🥈</span>
                    <span><strong>NJCAA Baseball World Series Championship (2019)</strong> - 2nd place finish</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                My athletic background as a scholarship baseball player developed crucial skills in teamwork, discipline, performance under pressure, and competitive drive - qualities that directly translate to my success in sales leadership and achieving ambitious targets.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;