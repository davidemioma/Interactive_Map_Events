import "./globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const font = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Events",
  description: "Interactive Historical Map Events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={font.className}>
          <Toaster />

          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
