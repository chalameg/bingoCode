import numberStyles from "../../../styles/bingo90/number.module.css";

const Number = (props) => {
  let colorCode;
  if (props.number <= 18) {
    colorCode = "#F1BF05";
  } else if (props.number <= 36) {
    colorCode = "#A666F8";
  } else if (props.number <= 54) {
    colorCode = "#4E76EE";
  } else if (props.number <= 72) {
    colorCode = "#4FE439";
  } else if (props.number <= 90) {
    colorCode = "#FF4B4B";
  }

  return (
    <span
      className={numberStyles.matrixNumber}
      style={{
        borderColor: colorCode,
        color: colorCode,
      }}
    >
      
      <span style={{marginTop: '7px', marginLeft:"-1.5px"}}>{props.number}</span>
    </span>
  );
};
export default Number;
