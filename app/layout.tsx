import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brandix.ai - AI-Powered Brand Kit Generator",
  description: "Generate complete brand identities instantly with AI. Get brand names, taglines, color palettes, and logos in seconds.",
  keywords: ["brand generator", "AI branding", "logo generator", "brand identity", "startup branding"],
  authors: [{ name: "Brandix.ai" }],
  openGraph: {
    title: "Brandix.ai - AI-Powered Brand Kit Generator",
    description: "Generate complete brand identities instantly with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
