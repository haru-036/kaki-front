import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import ContextProvider from "@/components/layout/ContextProvider";

export const metadata: Metadata = {
  title: "ArtHub",
  description: "GitHubのようにイラストをオンラインで共有・管理",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body>
        <ContextProvider>
          <Header />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
