const Header = () => {
  return (
    <header className="relative z-30 h-[64px] w-full bg-zinc-900 shadow-md shadow-zinc-600 dark:shadow-zinc-900">
      <div className="mx-auto flex h-full w-11/12 items-center justify-center px-5">
        <h1 className="font-poppins w-max text-[2rem] font-bold text-yellow-600 text-shadow-amber-800 text-shadow-lg">
          todos
        </h1>
        <div></div>
      </div>
    </header>
  );
};

export default Header;
