import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import WelcomePerson from "@/components/homepage/WelcomePerson";
import SaldoBanner from "@/components/homepage/SaldoBanner";

export const metadata: Metadata = {
  title: "SIMS PPOB",
  description: "Welcome to SIMS PPOB!",
  icons: "/img/Logo.png",
};

export default function HomepageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />

        <main className="max-w-[1230px] mx-auto">
          <section className="flex items-center justify-between mt-4">
            <WelcomePerson />
            <SaldoBanner />
          </section>
          {children}
        </main>
      </body>
    </html>
  );
}
