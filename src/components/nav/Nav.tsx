import { memo } from "react";
import Button from "../button/Button";
import { NavProps } from "../../types";

const Nav: React.FC<NavProps> = memo(
  ({ itemsLeft = 0, activePage, setActivePage, onClearCompleted }) => {
    return (
      <nav className="relative z-20 flex flex-wrap items-end justify-between gap-y-2 border-t border-zinc-200 bg-white p-5 text-zinc-400 shadow-2xl dark:border-zinc-500 dark:bg-zinc-700">
        <div className="grow px-2.5 text-center">
          <p>{itemsLeft} items&nbsp;left</p>
        </div>
        <ul className="flex grow justify-between">
          <li>
            <Button activePage={activePage} setActivePage={setActivePage}>
              All
            </Button>
          </li>
          <li>
            <Button activePage={activePage} setActivePage={setActivePage}>
              Active
            </Button>
          </li>
          <li>
            <Button activePage={activePage} setActivePage={setActivePage}>
              Completed
            </Button>
          </li>
        </ul>
        <div className="grow text-center">
          <button
            onClick={onClearCompleted}
            className="rounded border-0 px-1 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-600"
          >
            <p>Clear completed</p>
          </button>
        </div>
      </nav>
    );
  },
);

export default Nav;
