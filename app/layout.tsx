import type { Metadata } from "next";
import "./globals.css";
import { inter, ubuntu } from "./fonts";
import { ClerkProvider } from "@clerk/nextjs";
import GlobalProvider from "@/context/GlobalProvider";

export const metadata: Metadata = {
  title: "Nomadland",
  description:
    "Nomadland is a social media platform tailored for digital nomads, travelers, and adventure enthusiasts. It focuses on creating a community where users can share their travel experiences, find and offer travel tips, and connect with like-minded explorers. This platform leverages the passion for travel to build a network that supports and enhances the wanderlust lifestyle.",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <GlobalProvider>
        <html lang="en">
          <body className={ubuntu.className}>{children}</body>
        </html>
      </GlobalProvider>
    </ClerkProvider>
  );
}
