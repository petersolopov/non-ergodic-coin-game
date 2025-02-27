import React, { ButtonHTMLAttributes } from "react";
import { cn } from "../utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={cn(
        // Базовые стили
        "inline-flex items-center justify-center",
        "rounded-md text-sm font-medium",
        "h-10 px-4 py-2 cursor-pointer",

        // Цвета и эффекты
        "bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 hover:bg-slate-900 dark:hover:bg-slate-300",

        // Доступность
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",

        // Пользовательские классы
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

Button.displayName = "Button";

export { Button };
