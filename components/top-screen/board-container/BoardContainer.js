import {
  boardContainerCornerClip,
  boardContainerCornerClipIOS,
  boardContainer,
} from "../../../styles/index.module.scss";
import { useEffect, useState } from "react";
import connectWebSocket from "../../../config/socket";
import { isIOS } from "../../../common/functions";
import _ from "lodash";
import GameMainView from "../game-views/GameMainView";
import DNALoader from "../../common/loader/DNALoader";
import GameCountdown from "../game-views/GameCountdown";

const BoardContainer = ({messageData, viewMode}) => {
  const [boardClipClass, setBoardClipClass] = useState(
    `${boardContainerCornerClip}`
  );
  useEffect(() => {
    if (isIOS()) {
      setBoardClipClass((prev) => `${prev} ${boardContainerCornerClipIOS}`);
    }
  }, []);
  const renderContent = () => {
    
    if (messageData.type === 'new' || messageData.type === 'scheduled') {
      return <DNALoader />
    }
    switch (viewMode) {
      case "loading":
        return <DNALoader />;
      case "game":
        if(messageData?.inGame && messageData?.duration !== 10) 
          return <GameMainView messageData={messageData} />;
      case "countdown":
        return <GameCountdown duration={messageData.duration} />;
    }
  };
  return (
    <div className={boardContainer}>
      {renderContent()}
      <div className={boardClipClass} />
    </div>
  );
};
export default BoardContainer;
