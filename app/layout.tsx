import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CENAC",
  description:
    "Centro cultural con talleres, cursos y experiencias comunitarias de arte, musica y creatividad.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
