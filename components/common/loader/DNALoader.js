import animStyles from "../../../styles/anim.module.css";
import { Fade } from "react-reveal";

const DNALoader = () => (
  <div className={"h-100 w-100 flex align-center justify-center"}>
    <Fade>
      <div
        className={"flex align-center justify-center"}
        style={{
          width: 140,
          height: 70,
        }}
      >
        <div className={`w-100 h-100 ${animStyles.dnawrapper}`}>
          <div className={animStyles.dnadot1} />
          <div className={animStyles.dnadot2} />
          <div className={animStyles.dnadot3} />
          <div className={animStyles.dnadot4} />
          <div className={animStyles.dnadot5} />
          <div className={animStyles.dnadot6} />
          <div className={animStyles.dnadot7} />
          <div className={animStyles.dnadot8} />
          <div className={animStyles.dnadot9} />
          <div className={animStyles.dnadot10} />
          <div className={animStyles.dnabase1} />
          <div className={animStyles.dnabase2} />
          <div className={animStyles.dnabase3} />
          <div className={animStyles.dnabase4} />
          <div className={animStyles.dnabase5} />
        </div>
      </div>
    </Fade>
  </div>
);
export default DNALoader;
