import { Inter } from "next/font/google";
import "./globals.css";
import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "@/context/AuthContext";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevBlogs",
  description: "A blogs website for developers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Toaster position="top-center" />
          <Navbar />
          <div className="mt-20 w-full h-full">
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
