import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';
import ProjectCard from './ProjectCard';

function ProjectsSection() {
  const { projects } = usePortfolio();

  // Highlighted projects come first
  const sorted = [...projects].sort(
    (a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0)
  );

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="hero-heading text-4xl md:text-5xl font-bold font-display">
          Projects
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full accent-gradient" />
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sorted.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
