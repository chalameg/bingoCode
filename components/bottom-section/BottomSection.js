import { bottomSection } from "../../styles/index.module.scss";
import TabletView from "../tablet-view/TabletView";

const BottomSection = () => {
  return (
    <div className={`flex flex-1 ${bottomSection}`}>
      <TabletView />
    </div>
  );
};

export default BottomSection;
