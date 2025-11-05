import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="w-full text-center p-2">
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
    </div>
  );
};

export default Footer;
