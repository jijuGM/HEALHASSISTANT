
import { Link } from "react-router-dom";

const footerLinks = {
  Product: [
    { label: "How It Works", to: "/" },
    { label: "AI Insights", to: "/" },
    { label: "Cycle Awareness", to: "/" },
    { label: "Nutrition Guidance", to: "/" },
  ],
  Support: [
    { label: "FAQs", to: "/" },
    { label: "Contact", to: "/" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "/" },
    { label: "Terms of Service", to: "/" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">

      {/* Top subtle line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand + About */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="text-xl font-bold">PCOD Companion</span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              PCOD Companion is an AI-powered assistant designed to help women better understand their hormonal patterns and manage daily lifestyle choices.
            </p>

            <p className="text-xs text-gray-500">
              It combines user inputs like sleep, stress, and cravings with intelligent insights to provide personalized guidance for healthier routines.
            </p>
          </div>

          {/* About (NEW SECTION) */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              About
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400 leading-relaxed">
              <li>
                Focuses on real-life PCOD challenges like cravings, fatigue, and mood changes.
              </li>
              <li>
                Uses AI + contextual understanding to give practical, non-restrictive advice.
              </li>
              <li>
                Designed as a supportive companion, not a medical replacement.
              </li>
            </ul>
          </div>

          {/* Product + Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.Product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.Support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.Legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} PCOD Companion. All rights reserved.
          </p>

          <p className="text-xs text-gray-500 text-center sm:text-right max-w-md">
            This application provides general wellness guidance and is not a substitute for professional medical advice.
          </p>
        </div>

      </div>
    </footer>
  );

import { Link } from "react-router-dom";

const footerLinks = {
  Product: [
    { label: "How It Works", to: "/" },
    { label: "AI Insights", to: "/" },
    { label: "Cycle Awareness", to: "/" },
    { label: "Nutrition Guidance", to: "/" },
  ],
  Support: [
    { label: "FAQs", to: "/" },
    { label: "Contact", to: "/" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "/" },
    { label: "Terms of Service", to: "/" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">

      {/* Top subtle line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand + About */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="text-xl font-bold">PCOD Companion</span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              PCOD Companion is an AI-powered assistant designed to help women better understand their hormonal patterns and manage daily lifestyle choices.
            </p>

            <p className="text-xs text-gray-500">
              It combines user inputs like sleep, stress, and cravings with intelligent insights to provide personalized guidance for healthier routines.
            </p>
          </div>

          {/* About (NEW SECTION) */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              About
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400 leading-relaxed">
              <li>
                Focuses on real-life PCOD challenges like cravings, fatigue, and mood changes.
              </li>
              <li>
                Uses AI + contextual understanding to give practical, non-restrictive advice.
              </li>
              <li>
                Designed as a supportive companion, not a medical replacement.
              </li>
            </ul>
          </div>

          {/* Product + Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.Product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.Support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.Legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} PCOD Companion. All rights reserved.
          </p>

          <p className="text-xs text-gray-500 text-center sm:text-right max-w-md">
            This application provides general wellness guidance and is not a substitute for professional medical advice.
          </p>
        </div>

      </div>
    </footer>
  );
}
}