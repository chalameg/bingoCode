import numberStyles from "../../styles/number.module.css";

const Number = (props) => {
  let colorCode;
  if (props.number < 16) {
    colorCode = "#000000";
  } else if (props.number < 31) {
    colorCode = "#F2BD00";
  } else if (props.number < 46) {
    colorCode = "#8E53F6";
  } else if (props.number < 61) {
    colorCode = "#479B04";
  } else if (props.number < 76) {
    colorCode = "#FA4545";
  }

  return (
    <span
      className={numberStyles.matrixNumber}
      style={{ borderColor: colorCode, color: colorCode }}
    >
      {props.number}
    </span>
  );
};
export default Number;