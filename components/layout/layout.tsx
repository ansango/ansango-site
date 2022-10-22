import type { FC, ReactNode } from "react";
import { Footer } from "./footer";
import { NavBar } from "./navbar";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <NavBar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
};
