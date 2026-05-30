import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function EducationSection() {
  const { education } = usePortfolio();

  return (
    <section id="education" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* ---- section header ---- */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="hero-heading text-4xl md:text-5xl font-bold font-display">
            Education
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent-purple to-accent-magenta" />
        </motion.div>

        {/* ---- education timeline ---- */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* timeline spine — visible on md+ */}
          <div
            aria-hidden
            className="hidden md:block absolute left-6 top-0 bottom-0 w-px bg-border"
          />

          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative md:pl-16 mb-10 last:mb-0"
            >
              {/* timeline dot */}
              <div
                aria-hidden
                className="hidden md:flex absolute left-4 top-2 w-4 h-4 rounded-full border-2 border-accent-purple bg-bg items-center justify-center"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
              </div>

              {/* card */}
              <div className="bg-bg-card border border-border rounded-2xl p-6 hover:border-border-light transition-colors duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div className="flex items-start gap-3">
                    <GraduationCap
                      size={22}
                      className="text-accent-purple shrink-0 mt-0.5"
                    />
                    <div>
                      <h3 className="text-text-primary text-lg font-semibold leading-snug">
                        {edu.degree}
                      </h3>
                      <p className="text-text-secondary text-sm mt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:shrink-0">
                    <span className="mono-pill">{edu.period}</span>
                    {edu.score && (
                      <span className="text-accent-purple text-sm font-semibold whitespace-nowrap">
                        {edu.score}
                      </span>
                    )}
                  </div>
                </div>

                {/* coursework */}
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="mt-4 flex items-start gap-2">
                    <BookOpen
                      size={14}
                      className="text-text-muted shrink-0 mt-1"
                    />
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="text-xs px-3 py-1 rounded-full bg-bg border border-border text-text-secondary hover:text-text-primary hover:border-accent-purple/50 transition"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
