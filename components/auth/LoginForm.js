import { AiOutlineKey, AiOutlineUser } from "react-icons/ai";
import Button from "../common/button/Button";
import { IoIosLogIn } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";

import FacebookLogin from 'react-facebook-login';


const LoginForm = ({ onSubmit ,handle_fb_login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = {
      username,
      password,
    };
    onSubmit(formData);
  };

  const responseFacebook = async (response) => {
    // console.log(response);
    await handle_fb_login(response)
  }

  return (
    <form
      className={"flex flex-1 align-center flex-column justify-center"}
      action=""
    >
      <div className="form-controls">
        <div className={`form-group justify-between flex align-center`}>
          <label className={"flex align-center"} htmlFor="username">
            <AiOutlineUser />
            &nbsp;
            <span>Username</span>
          </label>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            placeholder={"Username"}
            type="text"
            name={"username"}
            id={"username"}
          />
        </div>
        <div className={`form-group justify-between flex align-center`}>
          <label className={"flex align-center"} htmlFor="password">
            <AiOutlineKey />
            &nbsp;
            <span>Password</span>
          </label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder={"******"}
            type="password"
            name={"password"}
            id={"password"}
          />
        </div>
      </div>
      <p style={{color:"white", margin:"2px 5px"}}>
        <a style={{fontSize:"16px"}}>Forgot Password?</a>
      </p>
      <Button
        disabled={password.length === 0 || username.length === 0}
        className={"playNowBtn"}
        buttonText={"Sign In"}
        onClick={handleLogin}
      />
      {/* <p style={{color:"white", fontSize:"15px", marginBottom:"10px"}}>or</p>
      
      <div className={"fbButton2"}> 
          <FacebookLogin
        appId={ process.env.NEXT_PUBLIC_FB_APP_ID} 
        autoLoad={false}
        fields="name,email,picture"
        cssClass={"fbButton flex align-center justify-center"}
        icon={<FaFacebook />}
        textButton={"Continue with Facebook"}
        tag={'Button'}
        callback={responseFacebook} />
    </div> */}


    </form>
  );
};
export default LoginForm;
