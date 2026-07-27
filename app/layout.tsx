import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CENAC",
  description:
    "Centro cultural con talleres, cursos y experiencias comunitarias de arte, musica y creatividad.",
  icons: {
    icon: [
      {
        url: "/assets/cenac-logo-symbol-transparent.png",
        type: "image/png",
      },
    ],
    shortcut: "/assets/cenac-logo-symbol-transparent.png",
    apple: "/assets/cenac-logo-symbol-transparent.png",
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
