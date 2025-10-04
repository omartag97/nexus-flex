import "@/app/globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/shared/components/system/ThemeProvider";
import Navbar from "@/shared/components/AppLayout/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-zinc-900 transition-colors duration-300 dark:bg-[hsl(217.2deg,85%,6%)] dark:text-zinc-50">
        <ThemeProvider defaultTheme="system">
          <QueryProvider>
            <Navbar />
            <main className="pt-20">{children}</main>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
