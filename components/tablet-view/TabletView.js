import { tabletView } from "../../styles/index.module.scss";
import { useContext } from "react";
import { AppContext, HomeContext } from "../../common/context";
import Loader from "../common/loader/Loader";
import Home from '../home/Home';
import Chat from "./Chat";

const TabletView = () => {
  const { isLoggedIn, loading, userData, logout } = useContext(AppContext);
  const {playerBalance,messageData} = useContext(HomeContext);
  
  return (
    <div className={`flex-1 flex flex-column ${tabletView}`}>
      {/* {(loading || messageData.type === 'new' || messageData.type === 'scheduled' ) ? (
        <Loader />
      ) : 
      (
          <Home />
      )
      } */}
      <Home/>
    </div>
  );
};
export default TabletView;
