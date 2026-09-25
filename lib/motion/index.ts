export const easings = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOutSoft: [0.45, 0, 0.55, 1] as const,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easings.outExpo },
  },
};

export const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/industries", label: "Industries" },
  { href: "/thinking", label: "Thinking" },
] as const;

export const footerLinks = [
  ...navLinks,
  { href: "/clients", label: "Clients" },
  { href: "/careers", label: "Careers" },
  { href: "/start-a-project", label: "Start a Project" },
] as const;
