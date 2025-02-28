import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Utility/Navbar";
import { AuthProvider } from "@/Context/AuthContext";
import Footer from "@/components/Utility/Footer";
import { Chatbot } from "@/components/chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <Toaster position="top-center" reverseOrder={false} />
          <div className={`container mx-auto p-2`}>{children}</div>
          <Footer />  
          <Chatbot/>
        </body>
      </html>
    </AuthProvider>
  );
}
