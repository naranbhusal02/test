import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "Gentlemen's Room – Crafting Confidence in Every Man",
  description: "Gentlemen's Room is a premium men's lifestyle destination combining a professional salon, cafe, man store, and personal development academy.",
  openGraph: {
    title: "Gentlemen's Room",
    description: "Crafting Confidence in Every Man",
    images: [{ url: '/logo.jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/logo.jpeg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
