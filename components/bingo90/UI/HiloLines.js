import { FaHandPointUp, FaHandPointRight, FaHandPointLeft, FaHandPointDown } from "react-icons/fa6";
import style from "../../../styles/bingo90/hilolines.module.css";

const HiloLines = ({ number, numbersDrawn, posFlipped, isMobile }) => {
  const shadowColors = ["#F1BF05", "#A666F8", "#4E76EE", "#4FE439", "#FF4B4B"];
  const colors = ["#841F1F", "#268819", "#4E76EE", "#5A1572", "#897A14"];
  const handBgColorSets = ["#841F1F", "#268819", "#4E76EE", "#5A1572", "#897A14"]
  colors.reverse();
  const handColors = (currentNumber) => handBgColorSets[parseInt((currentNumber - 1) / 18)]
  const prevNumber = numbersDrawn && numbersDrawn[numbersDrawn?.length - 2]
  const addLines = () => {
    let lines = [];
    for (let i = 0; i < 90; i++) {
      const color = colors[parseInt(i / 18)];
      const shadowColor = shadowColors[parseInt(i / 18)];
      if (i === number - 1) {
        lines.push(
          <div
            className={style.drowned}
            key={i}
            style={{
              background: `transparent`,
              // boxShadow: `50px 50px 50px 2px ${shadowColor}`
              boxShadow: `0 2px 5px ${shadowColor}, 0 -2px 5px ${shadowColor}`
            }}
          ></div>
        );
      }
      else if (numbersDrawn?.indexOf(i + 1) === -1) {
        lines.push(
          <div
            className={style.lines}
            key={i}
            style={{
              background: `${color}`,
            }}
          ></div>
        );
      } else {
        lines.push(
          <div
            className={style.lines}
            key={i}
            style={{
              background: `transparent`,
            }}
          ></div>
        );
      }
    }
    return lines;
  };
  return (
    <div className={`${style.hilolines} drag-handle`}
      style={{ position: "relative" }}
    >
      {addLines()}
      {numbersDrawn?.length > 0 &&
        <>
          {(prevNumber > number) ?
            <div style={{ position: "absolute", top: `${(0.32 * (93 - prevNumber)) - (0.32 * 10)}vh`, zIndex: "1000" }}>
              <FaHandPointDown color="white" size={28} style={{ backgroundColor: handColors(90 - prevNumber), borderRadius: "50%", padding: "4px", boxShadow: `0px 2px 2px rgba(0,0,0,0.3)` }} />
            </div>
            :
            <div style={{ position: "absolute", top: `${(0.32 * (93 - prevNumber)) - (0.32 * 3)}vh`, zIndex: "1000" }}>
              <FaHandPointUp color="white" size={28} style={{ backgroundColor: handColors(90 - prevNumber), borderRadius: "50%", padding: "4px", boxShadow: `0px 2px 2px rgba(0,0,0,0.3)` }} />
            </div>
          }
        </>
      }
      {number && <>
        {posFlipped && isMobile ?
          <div style={{ position: "absolute", right: isMobile ? "-1.2rem" : "0", top: `${0.32 * (90 - number) - (0.32 * 3)}vh`, zIndex: "1000" }}>
            <FaHandPointLeft color="white" size={isMobile ? 36 : 28} style={{ backgroundColor: handColors(90 - number), borderRadius: "50%", padding: "4px", boxShadow: `0px 2px 2px rgba(0,0,0,0.3)` }} />
          </div>
          :
          <div style={{ position: "absolute", left: isMobile ? "-1.2rem" : "0", top: `${0.32 * (90 - number) - (0.32 * 3)}vh`, zIndex: "1000" }}>
            <FaHandPointRight color="white" size={isMobile ? 36 : 28} style={{ backgroundColor: handColors(90 - number), borderRadius: "50%", padding: "4px", boxShadow: `0px 2px 2px rgba(0,0,0,0.3)` }} />
          </div>
        }
      </>}
    </div>
  );
};

export default HiloLines;
