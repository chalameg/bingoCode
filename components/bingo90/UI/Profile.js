import Link from "next/link";
import React, {useContext, useState} from "react";
import ProfileAvatar from "./ProfileAvatar";
import indexStyles from "../../../styles/bingo90/index.module.scss";
import { Bingo90Context } from "../../../common/context";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";

function Profile({isWon}) {
  
  const {playerBalance} = useContext(Bingo90Context);
  const isMobile = useMediaQuery("(max-width:920px)") | 
                    (useMediaQuery("(max-width: 1024px) and (min-height: 1167px)"));

  return (
    <div className={`flex ${indexStyles.profile}`}>
      {isWon && <Image src="/static/images/bingo90/hands.png" height={isMobile ? 20 : 25} width={ isMobile ? 25 : 31} alt="hands"/>}

      <div className={`${indexStyles.balanceContainer}`}>
        <span className={`${indexStyles.balance}`}>{playerBalance}</span>
        
        <img src="/static/images/yellowCoin.png" alt="coin"/>
      </div>
      <div className={`${indexStyles.profileAvatar}`}>
        <Link href="/">
          <a>
            <ProfileAvatar />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
