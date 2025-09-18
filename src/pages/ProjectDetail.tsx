import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { useEffect } from "react";
import { projectsData, getProjectById } from "../data/projects";

const ProjectDetail = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const projectId = parseInt(id as string);

  const project = getProjectById(projectId);

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
                  href={project.livePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <FaExternalLinkAlt className="mr-2" /> Launch App Experience
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
