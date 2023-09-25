import { cameraBar } from "../../styles/index.module.scss";
import { MdOutlineCamera } from "react-icons/md";

const CameraBar = () => {
  return (
    <div className={cameraBar}>
      <MdOutlineCamera />
    </div>
  );
};
export default CameraBar;
