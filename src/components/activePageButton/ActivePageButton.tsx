import { memo, ReactNode } from "react";
import { ActivePage } from "../../types";
import classNames from "classnames";

export interface ButtonProps {
  children: ReactNode;
  activePage?: ActivePage | null;
  setActivePage?: (page: ActivePage) => void;
  onClearCompleted?: () => void;
}

const ActivePageButton = memo(
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
        className={classNames(
          "rounded-sm px-2.5 transition-colors",
          isActive ? "border-1 border-zinc-400" : "border-0",
          "hover:bg-zinc-100 dark:hover:bg-zinc-600",
        )}
        onClick={handleClick}
      >
        {children}
      </button>
    );
  },
);

export default ActivePageButton;
