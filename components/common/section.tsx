import { type ReactNode, type FC } from "react";

export const Section: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <section
      className={`flex-1 relative transition duration-150 ease-out body-font overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
};
