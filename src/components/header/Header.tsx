import { useContext } from "react";
import Icon from "../icon/Icon";
import classNames from "classnames";
import { ThemeContext } from "../../themeContext/ThemeProvider";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      data-theme={theme}
      className="relative z-30 h-[64px] w-full bg-zinc-900 px-5 shadow-md shadow-zinc-600 dark:shadow-zinc-950"
    >
      <div className="mx-auto flex h-full w-11/12 justify-between gap-1 px-10">
        <div className="flex items-center gap-1">
          <Icon className={"w-[40px] fill-yellow-600"} name={"Todomvc"} />
          <h1 className="font-poppins w-max text-[2rem] font-bold text-yellow-600 text-shadow-amber-800 text-shadow-lg">
            todos
          </h1>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}
            className={classNames(
              theme === "dark"
                ? "before:translate-x-full"
                : "before:translate-x-0",
              "relative flex items-center gap-2 rounded-[5px] bg-zinc-700 p-1 shadow-inner shadow-zinc-800 duration-300 before:absolute before:top-0 before:left-0 before:h-full before:w-[50%] before:translate-x-0 before:rounded-[5px] before:bg-red-900 before:transition-all hover:before:bg-zinc-400 dark:hover:bg-zinc-600",
            )}
          >
            <Icon className="z-10 w-[25px]" name="Whitesun" />
            <Icon className="z-10 w-[25px]" name="Fullmoon" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
