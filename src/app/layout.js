import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata = {
  title: "NJ Bath Collection | Premium Bathroom Accessories",
  description: "Experience luxury and high-quality stainless steel bathroom hardware and sanitary accessories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased">
        {/* We will insert <Header /> and <Footer /> here in later steps */}
        <main>{children}</main>
      </body>
    </html>
  );
}