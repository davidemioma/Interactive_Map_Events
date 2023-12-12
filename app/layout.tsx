import "./globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";

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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="events-theme"
          >
            <Toaster />

            {children}
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
