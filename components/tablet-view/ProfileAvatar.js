import { userAvatar } from "../../styles/game-view.module.scss";
import { useContext } from "react";
import { AppContext } from "../../common/context";
const ProfileAvatar = () => {
  const { userData } = useContext(AppContext);

  return userData?.avatar ? (
    <img
      src={`https://${process.env.NEXT_PUBLIC_SERVER_URI}${userData?.avatar}`}
      className={`${userAvatar}`}
      data-place={"left"}
      alt={`avatar`}
    />
  ) : (
    <img
      alt={`avatar`}
      data-place={"left"}
      className={`${userAvatar}`}
      src={"/static/images/profile.png"}
    />
  );
};
export default ProfileAvatar;
