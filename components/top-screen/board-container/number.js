import numberStyles from "../../../styles/number.module.css";

export const Number = ({ number }) => {
  let colorCode;
  if (number < 16) {
    colorCode = "#000000";
  } else if (number < 31) {
    colorCode = "#F2BD00";
  } else if (number < 46) {
    colorCode = "#8E53F6";
  } else if (number < 61) {
    colorCode = "#479B04";
  } else if (number < 76) {
    colorCode = "#FA4545";
  }

  return (
    <span
      className={numberStyles.matrixNumber}
      style={{ borderColor: colorCode, color: colorCode }}
    >
      {number}
    </span>
  );
};
