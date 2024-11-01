import React, { useEffect, useState } from "react";
import axios from "axios";
import { login } from "../../services/users-services";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginErrorVisible, setLoginErrorVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onButtonClick = async () => {
    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 8) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ email, password });
      const res = await login(body, config);
      const id = res.data._id;
      if (res.data.token) {
        localStorage.setItem("SavedToken", "Bearer " + res.data.token);
        localStorage.setItem("SavedId", res.data._id);
        props.setLoggedIn(true);
        props.setEmail(email);
        navigate(`/bio`);
      } else {
        setLoginErrorVisible(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setLoginErrorVisible(false);
    setShowPassword(false);
  }, []);
  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        {showPassword ? (
          <AiFillEye
            className="eye-icon"
            onClick={() => setShowPassword((prevState) => !prevState)}
          />
        ) : (
          <AiFillEyeInvisible
            className="eye-icon"
            onClick={() => setShowPassword((prevState) => !prevState)}
          />
        )}
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      {loginErrorVisible && (
        <div className="loginErrorLabel">
          'Email or password is incorrect. Please try again.'
        </div>
      )}
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
      </div>
    </div>
  );
};

export default Login;
