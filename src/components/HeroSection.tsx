import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";
import SocialLinks from "./SocialLinks";

/* ── animation variants ── */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const bounceTransition = {
  y: {
    duration: 1.6,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut" as const,
  },
};

/* ── component ── */
export default function HeroSection() {
  const { profile } = usePortfolio();
  const { shortName, tagline, role } = profile;

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center bg-bg px-4 overflow-hidden"
    >
      {/* ── radial gradient glow behind avatar ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[480px] w-[480px] md:h-[640px] md:w-[640px] rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-purple) 0%, var(--color-accent-magenta) 50%, transparent 80%)",
        }}
      />

      {/* ── stagger container ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* 1 · avatar */}
        <motion.div variants={childVariants}>
          <div className="accent-gradient rounded-full p-[2.5px]">
            <img
              src="/avatar.png"
              alt={`${shortName}'s avatar`}
              className="h-32 w-32 rounded-full bg-bg object-cover md:h-40 md:w-40"
            />
          </div>
        </motion.div>

        {/* 2 · headline */}
        <motion.h1
          variants={childVariants}
          className="hero-heading text-5xl font-bold font-display leading-tight md:text-7xl lg:text-8xl"
        >
          Hi, I&rsquo;m {shortName}
        </motion.h1>

        {/* 3 · tagline */}
        <motion.p
          variants={childVariants}
          className="max-w-xl text-lg text-text-secondary md:text-xl"
        >
          {tagline}
        </motion.p>

        {/* 4 · role pill with accent gradient border */}
        <motion.span
          variants={childVariants}
          className="accent-gradient rounded-full p-[1.5px]"
        >
          <span className="inline-block rounded-full bg-bg px-5 py-1.5 text-sm font-medium tracking-wide text-text-primary">
            {role}
          </span>
        </motion.span>

        {/* 5 · social links (pill variant) */}
        <motion.div variants={childVariants}>
          <SocialLinks variant="pill" />
        </motion.div>
      </motion.div>

      {/* 6 · scroll-down indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 z-10 text-text-muted hover:text-text-secondary transition-colors duration-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={bounceTransition}>
          <ChevronDown size={28} strokeWidth={1.5} />
        </motion.div>
      </motion.a>
    </section>
  );
}
