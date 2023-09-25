import { useEffect, useState } from "react";

import { BsBatteryFull, BsBatteryCharging } from "react-icons/bs";
import { mobileFeature } from "../../styles/index.module.scss";

const Battery = () => {
  // Todo:: Fix for iOS
  // const [batteryIsCharging, setBatteryIsCharging] = useState(false);
  // useEffect(() => {
  //   navigator.getBattery().then(function (battery) {
  //     battery.addEventListener("chargingchange", function () {
  //       setBatteryIsCharging(battery.charging);
  //     });
  //   });
  // }, []);
  return (
    <div className={mobileFeature}>
      {/*{batteryIsCharging ? <BsBatteryCharging /> : <BsBatteryFull />}*/}
      <BsBatteryFull />
    </div>
  );
};
export default Battery;
