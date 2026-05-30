import { Quote, Sparkles } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";

export default function TestimonialsSection() {
  const { testimonials } = usePortfolio();

  // Duplicate array for seamless loop
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative sparkles */}
      <Sparkles className="absolute top-16 left-[10%] w-6 h-6 text-accent-purple/20" />
      <Sparkles className="absolute top-32 right-[15%] w-5 h-5 text-accent-magenta/15" />
      <Sparkles className="absolute bottom-20 left-[25%] w-4 h-4 text-accent-orange/15" />

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-16">
        <h2 className="hero-heading text-4xl md:text-5xl font-bold font-display">
          Testimonials
        </h2>
        <div className="w-16 h-1 accent-gradient rounded-full mx-auto mt-4" />
      </div>

      {/* Marquee */}
      <div className="overflow-hidden w-full">
        <div className="marquee-track">
          {doubled.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="min-w-[350px] max-w-[400px] bg-bg-card border border-border rounded-2xl p-6 mx-3 flex-shrink-0"
            >
              <Quote className="w-6 h-6 text-accent-purple/30 mb-3" />

              <p className="italic text-text-secondary text-sm leading-relaxed mb-6">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: t.avatarColor }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="uppercase text-text-primary text-xs font-semibold tracking-wider">
                    {t.name}
                  </p>
                  <p className="text-text-muted text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
