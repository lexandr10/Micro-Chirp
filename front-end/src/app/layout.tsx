import type { Metadata } from "next";
import { Noto_Sans} from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Provider";
import Header from "@/components/Header";


const zen = Noto_Sans({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-zen",
  style: ["normal"],
});

export const metadata: Metadata = {
  title: {
    default: "Micro-Chirp",
   template: `%s | Micro-Chirp`,
  },
  description: "Thank you for checking my task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${zen.variable} antialiased`}>
        <Providers>
          <Header/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
