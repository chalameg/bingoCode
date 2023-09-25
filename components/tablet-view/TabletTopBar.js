import Battery from "./Battery";
import Connection from "./Connection";
import Time from "./Time";
import { tabletTopBar, mobileFeatures } from "../../styles/index.module.scss";

const TabletTopBar = () => {
  return (
    <div className={`flex justify-between align-center ${tabletTopBar}`}>
      <div>
        <Time />
      </div>
      <div className={`flex justify-between align-center ${mobileFeatures}`}>
        <Connection />
        <Battery />
      </div>
    </div>
  );
};
export default TabletTopBar;
