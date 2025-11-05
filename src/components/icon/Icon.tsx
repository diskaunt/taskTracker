import CheckMark from "./icons/CheckMark";

const icons = {
  CheckMark: CheckMark,
};

type iconNames = keyof typeof icons;

const Icon: React.FC<{ name: iconNames }> = ({ name }) => {
  const CorrectIcon = icons[name];
  return <CorrectIcon />;
};

export default Icon;
