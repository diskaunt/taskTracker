import Footer from "../footer/Footer";
import Task from "../../pages/tasks/Task";
import { ThemeContext } from "../../themeContext/ThemeProvider";
import { useContext } from "react";

const Content = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div data-theme={theme}>
      <Task />
      <Footer />
    </div>
  );
};

export default Content;
