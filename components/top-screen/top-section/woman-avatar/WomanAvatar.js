import {womanAvatar} from "../../../../styles/index.module.scss";

const WomanAvatar = ({avatar}) => {
  return (
    <div 
      className={womanAvatar}
      style={{ backgroundImage: `url(${avatar})`}}
    />
  );
};
export default WomanAvatar;
