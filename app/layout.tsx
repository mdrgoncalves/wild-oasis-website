import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";

import "@/styles/globals.css";

export const metadata = {
  title: "The Wild Oasis",
  description: "The Wild Oasis is a luxury cabin rental company",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className="bg-primary-950 text-primary-100 min-h-screen"
      >
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
