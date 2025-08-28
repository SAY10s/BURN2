import type { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  className?: string;
};

export default function Modal({ children, className = "" }: ModalProps) {
  return (
    <div className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div
        className={`border-border bg-smoke w-full max-w-xl rounded-lg border-4 border-double p-8 shadow-lg ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
