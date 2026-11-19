import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portofolio-pabey.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Azwar Riyadh Subarkah | Senior AI Engineer & Software Architect',
    template: '%s | Azwar Riyadh Subarkah',
  },
  description:
    'Azwar Riyadh Subarkah is a Senior AI Engineer, Software Architect and technology leader with 23+ years of experience building enterprise software, AI-enabled products and digital platforms.',
  keywords: [
    'Azwar Riyadh Subarkah',
    'Senior AI Engineer',
    'Senior Software Architect',
    'Enterprise Architect',
    'Technology Leader',
    'Full Stack Engineer',
    'AI Engineering',
    'Digital Transformation',
    'Golang',
    'Python',
    'TypeScript',
    'PostgreSQL',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Azwar Riyadh Subarkah | Senior AI Engineer & Software Architect',
    description:
      '23+ years in software engineering, enterprise architecture, AI-enabled products and technology delivery leadership.',
    url: siteUrl,
    siteName: 'Azwar Riyadh Subarkah — Portfolio',
    type: 'website',
    images: [
      {
        url: '/background_header.png',
        width: 1200,
        height: 630,
        alt: 'Azwar Riyadh Subarkah — Senior AI Engineer and Software Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azwar Riyadh Subarkah | Senior AI Engineer & Software Architect',
    description:
      'Senior AI Engineer, Software Architect and technology leader with 23+ years of experience.',
    images: ['/background_header.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
