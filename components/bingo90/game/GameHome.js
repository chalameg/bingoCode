  import { StyleRoot } from "radium";
import bestTicketsStyles from "../../styles/bestTickets.module.css";
import { useContext } from "react";
import { AppContext } from "../../common/context";

const GameHome = () => {
  return (
    <div className={"flex flex-1 justify-center align-center flex-column"}>
      <StyleRoot>
        <div className={"chat-container"}>
          <div className="messages-container" />
          {/*{window?.window ? <ChatContainer /> : null}*/}
        </div>
      </StyleRoot>
    </div>
  );
};
export default GameHome;
