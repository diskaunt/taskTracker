import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full p-2 text-center">
      <span className="text-zinc-400">
        provided by&nbsp;
        <a
          className="underline"
          rel="stylesheet"
          target="_blank"
          href="https://github.com/diskaunt/"
        >
          diskaunt
        </a>
      </span>
    </footer>
  );
};

export default Footer;
