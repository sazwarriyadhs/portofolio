export type Project = {
  slug: string;
  name: string;
  category: string;
  description?: string;
  technologies: string[];
  github: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: 'digiai',
    name: 'DigiAI',
    category: 'AI & Digital Intelligence',
    technologies: ['TypeScript'],
    github: 'https://github.com/sazwarriyadhs/DigiAI',
    featured: true,
  },
  {
    slug: 'serenityews',
    name: 'SerenityEWS',
    category: 'Early Warning & Intelligence',
    technologies: ['TypeScript'],
    github: 'https://github.com/sazwarriyadhs/SerenityEWS',
    featured: true,
  },
  {
    slug: 'serenitytrade',
    name: 'Serenitytrade',
    category: 'FinTech & Trading',
    technologies: ['TypeScript'],
    github: 'https://github.com/sazwarriyadhs/Serenitytrade',
    featured: true,
  },
  {
    slug: 'visionask',
    name: 'VisionAsk',
    category: 'AI & Visual Intelligence',
    technologies: ['TypeScript'],
    github: 'https://github.com/sazwarriyadhs/visionask',
    featured: true,
  },
  {
    slug: 'datanexus',
    name: 'DataNexus',
    category: 'Data Intelligence',
    technologies: [],
    github: 'https://github.com/sazwarriyadhs/DataNexus',
    featured: true,
  },
  {
    slug: 'agrohub',
    name: 'AgroHub',
    category: 'AgriTech & Digital Agriculture',
    technologies: [],
    github: 'https://github.com/sazwarriyadhs/AgroHub',
    featured: true,
  },
];