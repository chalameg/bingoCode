import { Triangle } from "react-loader-spinner";
import { overlay } from "../../../styles/index.module.scss";

const Loader = () => {
  return <div className={`h-100 w-100 flex align-center justify-center`}>
    <Triangle wrapperClass={"loader"} height={80} width={80} />
  </div>;
};
export default Loader;
