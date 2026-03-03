import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Premium Wish Experience",
  description:
    "Trải nghiệm thiệp chúc mừng điện tử phong cách hiện đại và sang trọng.",
  openGraph: {
    title: "Premium Wish Experience",
    description:
      "Trải nghiệm thiệp chúc mừng điện tử phong cách hiện đại và sang trọng.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}
