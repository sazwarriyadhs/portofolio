export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  github: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: 'digiai',
    name: 'DigiAI — Kreasi AI',
    category: 'Generative AI · Creative Tools',
    description:
      'A generative AI web application that turns Indonesian-language prompts into images and short videos, including image-to-video workflows. Built with Next.js, TypeScript and Google Gemini / Genkit.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Google Gemini', 'Genkit'],
    github: 'https://github.com/sazwarriyadhs/DigiAI',
    featured: true,
  },
  {
    slug: 'serenityews',
    name: 'Serenity EWS Bogor',
    category: 'Early Warning · Disaster Intelligence',
    description:
      'A regional early-warning concept for weather and multi-hazard awareness in Bogor, combining monitoring dashboards, AI-assisted recommendations, community incident reporting and PostgreSQL-backed data.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Google AI', 'Genkit'],
    github: 'https://github.com/sazwarriyadhs/SerenityEWS',
    featured: true,
  },
  {
    slug: 'serenitytrade',
    name: 'Serenity AgriExport Hub',
    category: 'AgriTech · B2B Marketplace',
    description:
      'A B2B agricultural trade platform concept connecting farmers, exporters and international buyers, with role-based workflows, commodity and offer management, AI-assisted market insights and shipment tracking.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Genkit', 'Tailwind CSS'],
    github: 'https://github.com/sazwarriyadhs/Serenitytrade',
    featured: true,
  },
  {
    slug: 'visionask',
    name: 'VisionAsk',
    category: 'Document AI · Intelligent Search',
    description:
      'An intelligent document assistant for PDF and image files, combining OCR and natural-language question answering so users can retrieve contextual answers from uploaded content.',
    technologies: ['Next.js', 'TypeScript', 'Google Gemini', 'Genkit', 'PostgreSQL'],
    github: 'https://github.com/sazwarriyadhs/visionask',
    featured: true,
  },
  {
    slug: 'agrohub',
    name: 'AgroHub',
    category: 'AgriTech · Agriculture Super App',
    description:
      'An agriculture ecosystem platform in active development, designed around marketplace, smart-farming assistance, supply-chain workflows, market intelligence and digital services for agricultural stakeholders.',
    technologies: ['TypeScript', 'Web Platform', 'Mobile Platform', 'AI-enabled Services'],
    github: 'https://github.com/sazwarriyadhs/AgroHub',
    featured: true,
  },
];
