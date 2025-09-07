import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RightsGuard AI',
  description: 'Understand and Assert Your Legal Rights Instantly',
  keywords: 'legal rights, know your rights, legal aid, AI assistance',
  authors: [{ name: 'RightsGuard AI Team' }],
  openGraph: {
    title: 'RightsGuard AI',
    description: 'Understand and Assert Your Legal Rights Instantly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RightsGuard AI',
    description: 'Understand and Assert Your Legal Rights Instantly',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
