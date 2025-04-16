import { memo, ReactNode } from "react";
import { ActivePage } from "../App";

export interface ButtonProps {
  children: ReactNode;
  activePage?: ActivePage | null;
  setActivePage?: (page: ActivePage) => void;
  onClearCompleted?: () => void;
}

const Button = memo(
  ({ children, activePage = null, setActivePage = () => {} }: ButtonProps) => {
    // Функция переключения активной страницы
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.currentTarget;
      const page = target.textContent?.toLowerCase();

      // Проверка, что page является допустимым ActivePage
      if (page === "all" || page === "active" || page === "completed") {
        setActivePage(page);
      }
    };

    const childrenText = String(children).toLowerCase();
    const isActive = activePage === childrenText;

    return (
      <button
        className={`rounded-sm px-1 transition-colors ${
          isActive
            ? "border-1 border-gray-400 hover:bg-gray-100"
            : "border-0 hover:bg-gray-100"
        }`}
        onClick={handleClick}
      >
        {children}
      </button>
    );
  },
);

export default Button;
