import type { FC, ReactNode } from "react";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="font-sans">
      <main>{children}</main>
    </div>
  );
};
