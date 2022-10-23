import { type ReactNode, type FC } from "react";

export const Container: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`w-full max-w-4xl sm:px-6 md:px-12 px-4 py-12 lg:py-24 mx-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
