import style from "../../../styles/bingo90/number.module.css";

export const Number = ({ number, haveBackground }) => {
  let colorCode;
  if (number <= 18) {
    colorCode = "#897A14";
  } else if (number <= 36) {
    colorCode = "#5A1572";
  } else if (number <= 54) {
    colorCode = "#101084";
  } else if (number <= 72) {
    colorCode = "#268819";
  } else if (number <= 90) {
    colorCode = "#841F1F";
  }

  return (
    <span
      style={{
        borderColor: colorCode,
        color: colorCode,
        backgroundColor: haveBackground ? '#C0BFC2' : ''
      }}
      className={style.number}
    >
      <span>{number}</span>
    </span>
  );
};
