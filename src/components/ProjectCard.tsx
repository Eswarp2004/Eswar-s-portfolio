import { motion } from 'framer-motion';
import type { Project } from '../types/portfolio';

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-border-light transition-all duration-300 flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Image / Placeholder */}
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="bg-bg h-48 flex items-center justify-center px-4">
          <span className="text-text-muted/40 text-2xl font-bold text-center select-none">
            {project.title}
          </span>
        </div>
      )}

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Number badge */}
        <span className="text-text-muted text-sm font-mono">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Title */}
        <h3 className="text-text-primary text-xl font-semibold mt-1">
          {project.title}
        </h3>

        {/* Subtitle */}
        <p className="text-accent-purple text-sm">{project.subtitle}</p>

        {/* Description */}
        <p className="text-text-secondary text-sm mt-2 line-clamp-3">
          {project.description}
        </p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="bg-bg border border-border text-xs px-2 py-1 rounded-full text-text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Spacer pushes bottom content down */}
        <div className="flex-1" />

        {/* Bottom row: role + year */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-text-muted text-xs">{project.role}</span>
          <span className="text-text-muted text-xs">{project.year}</span>
        </div>

        {/* Live project button */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="accent-gradient text-white text-sm px-4 py-2 rounded-full font-medium hover:opacity-90 transition text-center mt-4 inline-block"
          >
            LIVE PROJECT
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default ProjectCard;
