import { IoIosLogIn, IoMdMail } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineKey, AiOutlineUser } from "react-icons/ai";
import Button from "../common/button/Button";
import { useState } from "react";

import FacebookLogin from 'react-facebook-login';


const RegisterForm = ({ onSubmit, errors , handle_fb_login}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username,
      email,
      password1: password,
      password2: confirmPassword,
    };
    onSubmit(formData);
  };

  const responseFacebook = async (response) => {
    console.log(response);
    await handle_fb_login(response)
  }

  return (
    <form
      className={"flex flex-1 align-center justify-center flex-column"}
      action=""
    >
      <div className="form-controls">
        <div className={`form-group justify-between flex align-center`}>
          <label className={"flex align-center"} htmlFor="email">
            <IoMdMail />
            &nbsp;<span>Email</span>
          </label>
          <input
            placeholder={"example@domain.com"}
            type="text"
            name={"email"}
            id={"email"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={`form-group justify-between flex align-center`}>
          <label className={"flex align-center"} htmlFor="username">
            <AiOutlineUser />
            &nbsp;
            <span>Username</span>
          </label>
          <input
            placeholder={"Username"}
            type="text"
            name={"username"}
            id={"username"}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className={`form-group justify-between flex align-center`}>
          <label className={"flex align-center"} htmlFor="password">
            <AiOutlineKey />
            &nbsp;
            <span>Password</span>
          </label>
          <input
            placeholder={"******"}
            type="password"
            name={"password"}
            id={"password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={`form-group justify-between flex align-center`}>
          <label className={"flex align-center"} htmlFor="confirm_password">
            <AiOutlineKey />
            &nbsp;
            <span>Confirm Password</span>
          </label>
          <input
            placeholder={"******"}
            type="password"
            name={"confirm_password"}
            id={"confirm_password"}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        {errors.map((error, index) => (
          <div className={"form-error"} key={index}>
            {error}
          </div>
        ))}
      </div>
        <Button
          className={"playNowBtn"}
          buttonText={"Sign Up"}
          disabled={
            username.length === 0 ||
            email.length === 0 ||
            password.length === 0 ||
            confirmPassword.length === 0 ||
            password !== confirmPassword
          }
          onClick={handleSubmit}
        />
        {/* <p
          style={{
            color: "white",
            fontSize: "15px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          or
        </p> */}
     
    {/* <div className={"fbButton2"}> 
        <FacebookLogin 
          appId={ process.env.NEXT_PUBLIC_FB_APP_ID} 
          autoLoad={false}
          fields="name,email,picture"
          cssClass={"fbButton flex align-center justify-center"}
          icon={<FaFacebook />}
          textButton={"Continue with Facebook"}
          callback={responseFacebook} />
    </div>  */}

    </form>
  );
};
export default RegisterForm;
