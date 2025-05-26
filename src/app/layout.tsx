import type { Metadata } from "next";
import "../styles/global.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  title: "HatsuVibes - Vive la frescura",
  description: "Descubre los productos de Hatsu y conéctate con la vibra.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}
