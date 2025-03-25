import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useEffect } from "react";

// Import the project data
// This should match the data in the Projects.tsx file
const projectsData = [
  {
    id: 1,
    title: "AI in Sales Playbook",
    category: "AI Development",
    description: "A comprehensive guide that outlines strategies, tools, and best practices for integrating AI technologies into sales processes for enhanced performance and customer engagement.",
    longDescription: "The AI in Sales Playbook is a detailed framework that helps sales teams leverage artificial intelligence to optimize their sales processes, enhance customer engagement, and drive better results. This playbook covers everything from the basics of AI in sales to advanced implementation strategies for different sales methodologies. It includes case studies, practical examples, and step-by-step guides for integrating AI tools into existing sales workflows.",
    technologies: ["AI/ML", "Sales Strategy", "Process Optimization", "Predictive Analytics"],
    features: [
      "Comprehensive AI integration strategies for sales teams",
      "Customizable AI-powered sales workflows",
      "Performance metrics and analytics dashboards",
      "Lead scoring and prioritization algorithms",
      "Automated follow-up and engagement systems"
    ],
    image: "/placeholder.jpg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 2,
    title: "AI in Marketing Playbook",
    category: "AI Development",
    description: "Strategic framework for marketing teams to implement AI-powered solutions for campaign optimization, customer segmentation, and personalized messaging at scale.",
    longDescription: "The AI in Marketing Playbook provides marketing professionals with comprehensive guidance on implementing artificial intelligence solutions to enhance campaign performance, automate repetitive tasks, and deliver personalized customer experiences at scale. This playbook covers various AI applications in marketing, from customer segmentation and targeting to content creation and optimization. It includes practical implementation strategies, tool recommendations, and metrics for measuring success.",
    technologies: ["AI/ML", "Marketing Automation", "Customer Insights", "Performance Analytics"],
    features: [
      "AI-powered customer segmentation models",
      "Automated content personalization frameworks",
      "Predictive campaign performance analytics",
      "Cross-channel marketing optimization",
      "Sentiment analysis and brand monitoring tools"
    ],
    image: "/placeholder.jpg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 3,
    title: "AI in Customer Success Playbook",
    category: "AI Development",
    description: "Innovative approaches to leveraging AI for proactive customer support, churn prediction, and personalized customer journey optimization to enhance retention and satisfaction.",
    longDescription: "The AI in Customer Success Playbook offers a comprehensive approach to implementing artificial intelligence solutions for enhancing customer retention, satisfaction, and lifetime value. This playbook explores how AI can transform customer success operations by enabling proactive support, identifying churn risks before they materialize, and creating personalized customer journeys. It includes implementation frameworks, tool recommendations, and best practices for measuring customer health and success.",
    technologies: ["AI/ML", "Customer Experience", "Retention Strategy", "Support Automation"],
    features: [
      "Predictive churn analysis and prevention frameworks",
      "AI-powered customer health scoring",
      "Automated support escalation systems",
      "Personalized customer journey mapping",
      "Voice of customer analysis tools"
    ],
    image: "/placeholder.jpg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 4,
    title: "SaaS Sales Acceleration Model",
    category: "Sales Strategy",
    description: "A data-driven framework for optimizing the SaaS sales pipeline, from lead generation to customer conversion, utilizing AI to identify high-value opportunities and improve win rates.",
    longDescription: "The SaaS Sales Acceleration Model is a comprehensive framework designed to optimize the entire sales pipeline for software-as-a-service businesses. This model leverages data analytics and artificial intelligence to identify high-potential leads, accelerate deal velocity, and improve conversion rates. It includes strategies for each stage of the sales funnel, from initial lead generation to closing and expansion, with a focus on maximizing efficiency and results.",
    technologies: ["SaaS", "Data Analytics", "AI Integration", "Pipeline Optimization"],
    features: [
      "AI-driven lead scoring and qualification",
      "Sales velocity optimization strategies",
      "Win/loss analysis frameworks",
      "Opportunity prioritization models",
      "Customer expansion playbooks"
    ],
    image: "/placeholder.jpg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 5,
    title: "B2B Sales AI Assistant",
    category: "AI Development",
    description: "A specialized AI assistant designed to support B2B sales teams by providing real-time market intelligence, competitive analysis, and personalized sales recommendations.",
    longDescription: "The B2B Sales AI Assistant is a cutting-edge tool that empowers sales professionals with real-time market intelligence, competitive insights, and personalized recommendations to enhance their performance. This AI assistant can analyze customer data, market trends, and competitive information to provide actionable insights during sales conversations. It includes features for meeting preparation, objection handling, and follow-up optimization to help sales teams close more deals more efficiently.",
    technologies: ["AI/ML", "Natural Language Processing", "B2B Sales", "Real-time Analytics"],
    features: [
      "Real-time competitive intelligence",
      "AI-powered objection handling suggestions",
      "Personalized conversation guides",
      "Meeting preparation and summary tools",
      "Follow-up optimization and tracking"
    ],
    image: "/placeholder.jpg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 6,
    title: "Revenue Growth Strategy",
    category: "Sales Strategy",
    description: "A comprehensive revenue growth framework that integrates AI-driven insights to identify expansion opportunities, optimize pricing strategies, and enhance customer lifetime value.",
    longDescription: "The Revenue Growth Strategy is a holistic framework that helps businesses accelerate growth by leveraging artificial intelligence to identify untapped opportunities, optimize pricing strategies, and maximize customer lifetime value. This strategy integrates data from sales, marketing, customer success, and finance to create a unified approach to revenue optimization. It includes methodologies for market expansion, customer monetization, and predictive forecasting to drive sustainable growth.",
    technologies: ["Revenue Strategy", "Growth Modeling", "AI Analytics", "Market Expansion"],
    features: [
      "AI-driven market opportunity identification",
      "Dynamic pricing optimization models",
      "Customer lifetime value enhancement strategies",
      "Cross-sell and upsell recommendation engines",
      "Predictive revenue forecasting"
    ],
    image: "/placeholder.jpg",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];

const ProjectDetail = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const projectId = parseInt(id as string);

  const project = projectsData.find((p) => p.id === projectId);

  useEffect(() => {
    // If project doesn't exist, redirect to projects page
    if (!project) {
      navigate('/projects');
    }
  }, [project, navigate]);

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <FaArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-200 dark:bg-gray-700 h-64 md:h-80 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Project Image
              </p>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                  {project.title}
                </h1>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded">
                  {project.category}
                </span>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Overview
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
                  {project.description}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {project.longDescription}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Key Features
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium px-3 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <FaGithub className="mr-2" /> View Details
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <FaExternalLinkAlt className="mr-2" /> Live Demo
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Other Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectsData
              .filter((p) => p.id !== projectId)
              .slice(0, 3)
              .map((p) => (
                <motion.div
                  key={p.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gray-200 dark:bg-gray-700 h-40 flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">Project Image</p>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                      {p.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {p.description}
                    </p>
                    <Link
                      to={`/projects/${p.id}`}
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center"
                    >
                      View Project
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
