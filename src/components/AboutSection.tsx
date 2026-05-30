import { motion } from "framer-motion";
import { usePortfolio } from "../hooks/usePortfolio";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

export default function AboutSection() {
  const { profile, skills } = usePortfolio();

  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      {/* ---- header ---- */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-12"
      >
        <h2 className="hero-heading text-4xl md:text-5xl font-bold font-display">
          About Me
        </h2>
        <div className="w-16 h-1 accent-gradient rounded-full mt-4" />
      </motion.div>

      {/* ---- bio ---- */}
      <motion.p
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bio-text text-text-secondary text-lg leading-relaxed max-w-3xl"
      >
        {profile.bio}
      </motion.p>

      {/* ---- skills grid ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {skills.categories.map((category, i) => (
          <motion.div
            key={category.name}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="bg-bg-card border border-border rounded-2xl p-6 hover:border-border-light transition-colors"
          >
            {/* category name with accent dot */}
            <h3 className="text-text-primary font-semibold text-lg mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full accent-gradient shrink-0" />
              {category.name}
            </h3>

            {/* skill pills */}
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="text-xs px-3 py-1.5 rounded-full bg-bg border border-border text-text-secondary hover:text-text-primary hover:border-accent-purple/50 transition"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
