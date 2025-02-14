"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Poppins } from "next/font/google";
import "./globals.css";

const poopins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--pop",
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <title>Quizo</title>
      </head>
      <body className={poopins.className}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
