import style from "../../../styles/speedometer.module.css";

const Speedometer = ({ number, numbersDrawn }) => {
  const angle = 180 / 75;
  const colors = ["#000", "#F2BD00", "#6E1CFF", "#479B04", "#FA4545"];
  const addLines = () => {
    let lines = [];
    for (let i = 0; i < 75; i++) {
      const color = colors[parseInt(i / 15)];
      if (i === number - 1) {
        lines.push(
          <div
            className={style.drowned}
            key={i}
            style={{
              "--rot": `${210 - angle * i}deg`,
              background: `${color}`,
            }}
          ></div>
        );
      }
      else if(numbersDrawn.indexOf(i+1) === -1) {
        lines.push(
          <div
            className={style.lines}
            key={i}
            style={{
              "--rot": `${210 - angle * i }deg`,
              background: `${color}`,
            }}
          ></div>
        );
      }
    }
    return lines;
  };
  return (
    <div className={style.wrapper}>
      <div className={style.speedometer} key={8}>
        {addLines()}
      </div>
    </div>
  );
};

export default Speedometer;
