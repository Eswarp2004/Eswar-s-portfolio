import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";
import SocialLinks from "./SocialLinks";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ContactSection() {
  const { profile } = usePortfolio();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct a mailto link as fallback since there's no backend
    const subject = encodeURIComponent(
      `Portfolio Contact from ${formState.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );
    window.open(
      `mailto:${profile.social.email}?subject=${subject}&body=${body}`,
      "_self"
    );
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: profile.social.email,
      href: `mailto:${profile.social.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.social.phone,
      href: `tel:${profile.social.phone}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* ---- section header ---- */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="hero-heading text-4xl md:text-5xl font-bold font-display">
            Get In Touch
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent-purple to-accent-magenta" />
          <p className="text-text-secondary mt-6 max-w-lg mx-auto">
            Have a project in mind or want to discuss embedded systems,
            firmware, or systems programming? I'd love to hear from you.
          </p>
        </motion.div>

        {/* ---- content grid ---- */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* ---- Left: Contact info + socials ---- */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* contact details */}
            <div className="space-y-5">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-bg-card border border-border flex items-center justify-center shrink-0 group-hover:border-accent-purple/50 transition-colors">
                      <Icon size={20} className="text-accent-purple" />
                    </div>
                    <div>
                      <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-text-primary text-sm mt-0.5 flex items-center gap-1">
                        {item.value}
                        {item.href && (
                          <ArrowUpRight
                            size={12}
                            className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block hover:opacity-80 transition-opacity"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            {/* social links */}
            <div>
              <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-4">
                Connect
              </p>
              <SocialLinks variant="icon" />
            </div>

            {/* availability badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-text-secondary text-sm">
                Available for opportunities
              </span>
            </div>
          </motion.div>

          {/* ---- Right: Contact form ---- */}
          <motion.div variants={itemVariants}>
            <form
              onSubmit={handleSubmit}
              className="bg-bg-card border border-border rounded-2xl p-8 space-y-6"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-text-muted text-xs font-semibold uppercase tracking-wider mb-2"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, name: e.target.value }))
                  }
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent-purple/50 transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-text-muted text-xs font-semibold uppercase tracking-wider mb-2"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, email: e.target.value }))
                  }
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent-purple/50 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-text-muted text-xs font-semibold uppercase tracking-wider mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, message: e.target.value }))
                  }
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent-purple/50 transition-colors resize-none"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="accent-gradient text-white w-full py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                {submitted ? (
                  "Opening mail client…"
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
