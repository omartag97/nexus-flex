import { QueryProvider } from "@/providers/query-provider";

import { ThemeProvider } from "@/shared/components/system/ThemeProvider";
import Navbar from "@/shared/components/AppLayout/Navbar";
import SimulationPanel from "@/shared/components/motion/Toolbar/SimulationPanel";

import { Toaster } from "sonner";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-zinc-900 transition-colors duration-300 dark:bg-[hsl(217.2deg,85%,6%)] dark:text-zinc-50">
        <ThemeProvider defaultTheme="system">
          <NuqsAdapter>
            <QueryProvider>
              <Navbar />

              <main>{children}</main>

              <footer>
                <SimulationPanel />
              </footer>

              <Toaster position="top-center" richColors />
            </QueryProvider>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
