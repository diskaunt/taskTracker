import CheckMark from "./icons/CheckMark";
import { Fullmoon } from "./icons/Fullmoon";
import { Todomvc } from "./icons/Todomvc";
import { Whitesun } from "./icons/Whitesun";

const icons = {
  CheckMark: CheckMark,
  Whitesun: Whitesun,
  Fullmoon: Fullmoon,
  Todomvc: Todomvc,
};

type iconNames = keyof typeof icons;

const Icon: React.FC<{ name: iconNames; className?: string }> = ({
  name,
  className,
}) => {
  const CorrectIcon = icons[name];
  return <CorrectIcon className={className} />;
};

export default Icon;
