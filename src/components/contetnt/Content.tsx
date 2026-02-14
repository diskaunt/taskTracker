import Header from "../header/Header";
import MainContent from "../mainContent/MainContent";

const Content : React.FC<{title: string}> = ({title}) => {
  return (
    <div className={"relative flex flex-col w-full h-full"}>
      <Header title = {title}/>
      <MainContent />
    </div>
  );
};

export default Content;
