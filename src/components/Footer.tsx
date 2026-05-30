import { useState } from "react";
import { MapPin, Mail, Phone, Clipboard, Check } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";
import SocialLinks from "./SocialLinks";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const { profile } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback silently
    }
  };

  return (
    <footer className="bg-bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 — Brand */}
          <div>
            <h3 className="hero-heading text-2xl font-bold font-display">
              {profile.name}
            </h3>
            <p className="text-text-secondary text-sm mt-2">
              {profile.specialization}
            </p>
            <p className="text-text-muted text-sm mt-1 flex items-center gap-1.5">
              <MapPin size={14} />
              {profile.location}
            </p>
          </div>

          {/* Column 2 — Navigate */}
          <div>
            <p className="text-text-muted text-xs font-semibold tracking-widest uppercase mb-4">
              Navigate
            </p>
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary transition text-sm py-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Reach Out */}
          <div>
            <p className="text-text-muted text-xs font-semibold tracking-widest uppercase mb-4">
              Reach Out
            </p>

            {/* Email row */}
            <div className="flex items-center gap-2 text-text-secondary text-sm">
              <Mail size={14} className="shrink-0" />
              <span>{profile.social.email}</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="relative ml-1 text-text-muted hover:text-text-primary transition"
                aria-label="Copy email"
              >
                {copied ? <Check size={14} /> : <Clipboard size={14} />}
                {copied && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-accent-purple whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
            </div>

            {/* Phone row */}
            <div className="flex items-center gap-2 text-text-secondary text-sm mt-2">
              <Phone size={14} className="shrink-0" />
              <span>{profile.social.phone}</span>
            </div>

            {/* Social links */}
            <div className="mt-4">
              <SocialLinks variant="icon" />
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-muted text-xs">
            &copy; 2026 {profile.name}. All rights reserved.
          </p>
          <p className="text-text-muted text-xs mt-2 md:mt-0">
            Built with React &amp; Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
