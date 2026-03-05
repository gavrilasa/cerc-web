import Link from "next/link";
import Image from "next/image";
import { Github, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "Projects", href: "/projects" },
    { label: "Divisions", href: "/divisions" },
    { label: "Members", href: "/members" },
    { label: "Tech Stack", href: "/tech-stack" },
  ];

  const socials = [
    { icon: Github, href: "https://github.com/cerc-undip", label: "GitHub" },
    { icon: Instagram, href: "https://instagram.com/cercundip", label: "Instagram" },
    { icon: Mail, href: "mailto:cerc@undip.ac.id", label: "Email" },
  ];

  return (
    <footer className="py-12 md:py-16 bg-neutral-100 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-10">

          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/web-app-manifest-192x192.png"
                alt="CERC Logo"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <div>
                <h3 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                  CERC
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                  Research Club
                </p>
              </div>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
              Computer Engineering Research Club — Teknik Komputer Universitas Diponegoro.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-4">
              Navigate
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-2 mb-6">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Semarang, Indonesia
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500">
          <p>© {currentYear} CERC Undip. All rights reserved.</p>
          <p className="font-medium">Think Precisely, Build Wisely.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;