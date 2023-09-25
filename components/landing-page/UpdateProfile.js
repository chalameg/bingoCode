import Link from "next/link";
import React, { useContext, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { useFilePicker } from "use-file-picker";
import axiosApp from "../../common/api";
import { BINGO_ACCESS_TOKEN_KEY } from "../../common/constants";
import { AppContext } from "../../common/context";
import landingPageStyles from "../../styles/landingPage.module.scss";

function UpdateProfile({ handle_avatar_update }) {
  const { userData } = useContext(AppContext);

  // userData?.avatar
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const [openFileSelector, { plainFiles, loading, errors, clear }] =
    useFilePicker({
      multiple: false,
      limitFilesConfig: { max: 1 },
      accept: "image/*",
    });

  const token = localStorage.getItem(BINGO_ACCESS_TOKEN_KEY) ?? "";

  useEffect(() => {
    const uploadImage = async () => {
      if (plainFiles.length) {
        const payload = new FormData();
        const imagedata = plainFiles[0];

        const image = await resizeFile(imagedata);

        payload.append("avatar", image);

        axiosApp
          .patch("/edit-profile/", payload, {
            headers: {
              "Content-Type":
                "multipart/form-data; boundary=----WebKitFormBoundaryyEmKNDsBKjB7QEqu",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            handle_avatar_update(res.data.avatar);
            clear();
          })
          .catch((error) => {
            clear();
          });
      }
    };

    uploadImage().catch(console.error);
  }, [plainFiles]);

  if (errors.length > 0) return <p>Error!</p>;

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {userData?.avatar ? (
        <div>
          <Link href="/bingo75">
            <img
              className={`${landingPageStyles.userAvatar}`}
              data-place={"left"}
              src={`https://${
                process.env.NEXT_PUBLIC_SERVER_URI + userData?.avatar
              }`}
              alt="avatar"
            />
          </Link>
          <div
            className={`${landingPageStyles.updateIcon}`}
            onClick={openFileSelector}
          >
            <img
              data-place={"left"}
              src="/static/images/addProfile.svg"
              alt="avatar"
            />
          </div>
        </div>
      ) : (
        <div>
          <Link href="/bingo75">
            <img
              // style={{ marginBottom: "20px" }}
              className={`${landingPageStyles.userAvatar}`}
              data-place={"left"}
              src="/static/images/profile.png"
              alt="avatar"
            />
          </Link>
          <div
            className={`${landingPageStyles.updateIcon}`}
            onClick={openFileSelector}
          >
            <img
              data-place={"left"}
              src="/static/images/addProfile.svg"
              alt="avatar"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateProfile;
