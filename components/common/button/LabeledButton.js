import { label } from "../../../styles/index.module.scss";
import Button from "./Button";

const LabeledButton = ({ buttonText, labelText, onClick, icon, reverse }) => {
  return (
    <div className={`flex align-center justify-center flex-column`}>
      <div className={label}>{labelText}</div>
      <Button icon={icon} reverse={reverse} onClick={onClick} buttonText={buttonText} />
    </div>
  );
};
export default LabeledButton;
