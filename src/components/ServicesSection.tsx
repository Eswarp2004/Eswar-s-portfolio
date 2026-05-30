import { motion } from "framer-motion";
import { Cpu, Cable, Terminal, Wrench, type LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Cpu,
    title: "Embedded Systems Development",
    description:
      "Firmware design for ARM Cortex-M and ESP32 platforms. Real-time operating systems (FreeRTOS), sensor integration, and closed-loop motor control with low-latency guarantees.",
  },
  {
    icon: Cable,
    title: "Protocol Engineering",
    description:
      "Design and implementation of communication stacks — UART, SPI, I2C, CAN Bus, RS-485, and TCP/IP. Signal mapping, DBC file interpretation, and bus diagnostics.",
  },
  {
    icon: Terminal,
    title: "Systems Programming",
    description:
      "High-performance C/C++ applications with precise memory management, multi-threading, and concurrency. Profiling, GDB debugging, and optimization for resource-constrained targets.",
  },
  {
    icon: Wrench,
    title: "Hardware-Software Integration",
    description:
      "Bridging firmware and application layers — ROS-based robotics, telemetry dashboards, and real-time diagnostics using oscilloscopes, logic analyzers, and CANalyzer.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6">
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
            What I Do
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent-purple to-accent-magenta" />
        </motion.div>

        {/* ---- services list ---- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const number = String(index + 1).padStart(2, "0");

            return (
              <motion.div key={service.title} variants={rowVariants}>
                {/* divider line (top of every row) */}
                <div className="border-t border-border" />

                <div className="grid grid-cols-[auto_1fr] md:grid-cols-[4rem_1fr] gap-6 md:gap-10 py-8 md:py-10 items-start">
                  {/* ---- number ---- */}
                  <span className="font-mono text-sm text-text-muted pt-1 select-none">
                    {number}
                  </span>

                  {/* ---- content ---- */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <Icon
                        size={22}
                        className="text-accent-purple shrink-0"
                      />
                      <h3 className="text-text-primary text-xl font-semibold font-display">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-text-secondary leading-relaxed max-w-2xl">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* bottom border to close the last row */}
          <div className="border-t border-border" />
        </motion.div>
      </div>
    </section>
  );
}
