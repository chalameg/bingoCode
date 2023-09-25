import Button from "./button/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { title } from "../../styles/index.module.scss";

const Title = ({ titleText, onBackClick }) => {
  return (
    <div className={"flex align-center justify-between"}>
      <Button
        buttonText={"Back"}
        onClick={onBackClick}
        className={"back"}
        reverse={true}
        icon={<AiOutlineArrowLeft />}
      />
      <h2 className={`flex-1 ${title}`}>{titleText}</h2>
    </div>
  );
};
export default Title;
