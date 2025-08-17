import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={
        `border-witcher-yellow bg-witcher-yellow text-secondary hover:bg-witcher-orange flex cursor-pointer items-center justify-center border-4 border-double px-4 py-2 font-bold transition-colors` +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}
