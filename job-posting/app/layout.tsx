import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MuiThemeProvider from '@/components/MuiThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Job Posting Platform',
  description: 'A modern job posting platform for recruiters and job seekers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MuiThemeProvider>
          {children}
        </MuiThemeProvider>
      </body>
    </html>
  );
}