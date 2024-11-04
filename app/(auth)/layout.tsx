import HeroImage from "@/components/login/HeroImage";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <div className="w-full h-[1024px] flex items-center">
          <section className="h-full flex flex-col justify-center items-center flex-grow">
            {children}
          </section>
          <section className="h-full">
            <HeroImage />
          </section>
        </div>
      </body>
    </html>
  );
}
