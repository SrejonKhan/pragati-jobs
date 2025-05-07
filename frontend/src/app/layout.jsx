import { Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/shared/sidebar/Sidebar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });
const hindSiliguri = Hind_Siliguri({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-hind-siliguri'
});

export const metadata = {
  title: "Pragoti AI",
  description: "Bridging Education and Employment for a Better Future",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full ${hindSiliguri.variable}`}>
      <body className={`${inter.className} h-full`}>
        <div className="flex h-full">
          <Sidebar />
          <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">{children}</main>
        </div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
