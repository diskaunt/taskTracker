import { useContext } from "react";
import { ThemeContext } from "../../themeContext/ThemeProvider";
import Content from "../../components/contetnt/Content";

const Task: React.FC<{ title: string }> = (props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div data-theme={theme} className={"h-main relative mx-auto w-1/2 p-5"}>
      <Content {...props} />
    </div>
  );
};

export default Task;
