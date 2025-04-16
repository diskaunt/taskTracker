import Button from "./Button";
import { ActivePage } from "../App";
import { memo } from "react";

const Footer = memo(
  ({
    itemsLeft = 0,
    activePage,
    setActivePage,
    onClearCompleted,
  }: {
    itemsLeft?: number;
    activePage: ActivePage;
    setActivePage: (activePage: ActivePage) => void;
    onClearCompleted: () => void;
  }) => {
    return (
      <footer className="relative z-20 flex items-end justify-between border-t border-gray-200 bg-white p-5 text-gray-400 shadow-2xl">
        <div>
          <p>{itemsLeft} items left</p>
        </div>
        <div>
          <Button activePage={activePage} setActivePage={setActivePage}>
            All
          </Button>
        </div>
        <div>
          <Button activePage={activePage} setActivePage={setActivePage}>
            Active
          </Button>
        </div>
        <div>
          <Button activePage={activePage} setActivePage={setActivePage}>
            Completed
          </Button>
        </div>
        <div>
          <button
            onClick={onClearCompleted}
            className="rounded border-0 px-1 transition-colors hover:bg-gray-100"
          >
            <p>Clear completed</p>
          </button>
        </div>
      </footer>
    );
  },
);

export default Footer;
