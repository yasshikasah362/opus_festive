// app/layout.tsx
import './globals.css';
import { Providers } from './providers';
import Navbar from '../components/Navbar';
import { Poppins } from "next/font/google";

export const metadata = {
  title: 'FastiveMaker',
  description: 'Simple Auth using NextAuth',
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Providers>
          <Navbar/>
          {children}</Providers>
      </body>
    </html>
  );
}
