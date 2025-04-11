import React from 'react';
import Button from './Button';
import { ActivePage } from '../App';

const Footer = ({
  itemsLeft,
  activePage,
  setActivePage,
  onClearCompleted,
}: {
  itemsLeft: number;
  activePage: ActivePage;
  setActivePage: (activePage: ActivePage) => void;
  onClearCompleted: () => void;
}) => {
  return (
    <footer className='items-end flex justify-between p-5 border-t border-gray-200 text-gray-400'>
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
          className='px-1 hover:bg-gray-100 transition-colors rounded border-0'
        >
          <p>Clear completed</p>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
