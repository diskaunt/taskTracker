import Footer from "../../components/footer/Footer";
import Task from "../../pages/tasks/Task";
import ThemeProvider from "../../themeContext/ThemeProvider";

const AppLayout: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="relative h-[100svh] w-[100svw] min-w-[1280px] overflow-x-auto overflow-y-hidden bg-zinc-200 dark:bg-zinc-800">
        <Task title = {"kanban"}/>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default AppLayout;
