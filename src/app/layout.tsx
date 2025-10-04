import "@/app/globals.css";
import { QueryProvider } from "@/providers/query-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
