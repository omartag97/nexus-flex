"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 60 seconds
        retry: (failureCount, error) => {
          // Don't retry on authentication/authorization errors
          if (error instanceof Response && [401, 404].includes(error.status)) {
            return false;
          }
          // Retry up to 2 times for other errors
          return failureCount < 2;
        },
      },
      mutations: {
        retry: (failureCount, error) => {
          // Don't retry mutations on client errors
          if (
            error instanceof Response &&
            error.status >= 400 &&
            error.status < 500
          ) {
            return false;
          }
          return failureCount < 1;
        },
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
