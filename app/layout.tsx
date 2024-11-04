import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/utils/Providers/ReactQueryProvider";
import { CookiesProvider } from "next-client-cookies/server";

export const metadata: Metadata = {
  title: "SIMS PPOB",
  description: "Welcome to SIMS PPOB!",
  icons: "/img/Logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ReactQueryProvider>
          <CookiesProvider>
            {children}
          </CookiesProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
