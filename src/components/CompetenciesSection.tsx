import { motion } from "framer-motion";
import { Target, Bug, Terminal, Users } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "Systems Integration & Testing": Target,
  "Debugging & Diagnostics": Bug,
  "System Programming": Terminal,
  "Collaboration & Adaptability": Users,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function CompetenciesSection() {
  const { competencies } = usePortfolio();

  return (
    <section id="competencies" className="py-24 px-6">
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
            Key Strengths
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent-purple to-accent-magenta" />
        </motion.div>

        {/* ---- competency cards ---- */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {competencies.map((comp, index) => {
            const Icon = ICONS[comp.title] || Target;
            const number = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={comp.title}
                variants={cardVariants}
                className="bg-bg-card border border-border rounded-2xl p-6 hover:border-border-light transition-colors duration-300 group"
              >
                <div className="flex items-start gap-4">
                  {/* icon circle */}
                  <div className="w-12 h-12 rounded-xl bg-bg border border-border flex items-center justify-center shrink-0 group-hover:border-accent-purple/50 transition-colors">
                    <Icon size={20} className="text-accent-purple" />
                  </div>

                  <div className="min-w-0">
                    {/* number + title */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-text-muted select-none">
                        {number}
                      </span>
                      <h3 className="text-text-primary text-lg font-semibold font-display leading-snug">
                        {comp.title}
                      </h3>
                    </div>

                    {/* description */}
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {comp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
