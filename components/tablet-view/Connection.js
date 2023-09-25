import { useEffect, useState } from "react";

import { GiNetworkBars } from "react-icons/gi";
import { mobileFeature } from "../../styles/index.module.scss";

const Connection = () => {
  // TODO:: Fix for iOS
  // const [connectionType, setConnectionType] = useState("");
  // useEffect(() => {
  //   const connection =
  //     navigator.connection ||
  //     navigator.mozConnection ||
  //     navigator.webkitConnection;
  //   setConnectionType(connection.effectiveType);
  //   const updateConnectionStatus = () => {
  //     setConnectionType(connection.effectiveType);
  //   };
  //   connection.addEventListener("change", updateConnectionStatus);
  // }, []);
  return (
    <div className={mobileFeature}>
      <GiNetworkBars />
    </div>
  );
};
export default Connection;
