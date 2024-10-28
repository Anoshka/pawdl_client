import React, { useEffect, useState } from "react";
import axios from "axios";
import { register } from "../../services/users-services";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [petName, setPetname] = useState("");
  const [petType, setPetType] = useState("");
  const [breed, setBreed] = useState("");
  const [avatar, setAvatar] = useState("");
  const [temperament, setTemperament] = useState("");
  const [status, setStatus] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [petNameError, setPetnameError] = useState("");
  const [petTypeError, setPetTypeError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");

  const [registerResponseMessage, setRegisterResponseMessage] = useState("");
  const [registerResponseMessageVisible, setRegisterResponseMessageVisible] =
    useState(false);
  const [registerResponseIsError, setRegisterResponseIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  const onButtonClick = async () => {
    // Set initial error values to empty
    setUsernameError("");
    setPetnameError("");
    setPetTypeError("");
    setPhoneError("");
    setEmailError("");
    setPasswordError("");
    setPassword2Error("");

    // Check if the user has entered all fields correctly
    if ("" === username) {
      setUsernameError("User name is required.");
      return;
    }
    if ("" === petName) {
      setPetnameError("Pet name is required.");
      return;
    }
    if ("" === petType) {
      setPetTypeError("Pet type is required.");
      return;
    }
    if ("" === phone) {
      setPhoneError("Please enter your phone number");
      return;
    }
    if ("" === email) {
      setEmailError("Please enter your email address");
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

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    if (password !== password2) {
      setPassword2Error("Passwords must match exactly");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        user_name: username,
        pet_name: petName,
        type: petType,
        breed: breed,
        avatar: avatar,
        temperament: temperament,
        status: status,
        bio: bio,
        location: location,
        contact_phone: phone,
        contact_email: email,
        password: password,
      });
      const res = await register(body, config);
      if (res.data.token) {
        console.log("there's a token");
        setRegisterResponseMessage("Signup successful...Logging In.");
        setRegisterResponseIsError(false);
        setTimeout(function () {
          console.log("res data front end ", res.data);
          localStorage.setItem("SavedToken", "Bearer " + res.data.token);
          localStorage.setItem("SavedId", res.data._id);
          props.setLoggedIn(true);
          props.setEmail(email);
          navigate(`/`);
        }, 2000);
      }
    } catch (err) {
      if (err.response.data.errorMsg) {
        setRegisterResponseMessage(err.response.data.errorMsg);
        setRegisterResponseIsError(true);
      }

      // handle other errors here if needed
    }
  };

  useEffect(() => {
    setRegisterResponseMessageVisible(false);
    setRegisterResponseIsError(false);
    setShowPassword(false);
    setShowPassword2(false);
  }, []);

  useEffect(() => {
    setRegisterResponseMessageVisible(registerResponseMessage !== "");
  }, [registerResponseMessage]);
  return (
    <div className={"mainContainer"}>
      <br />
      <div className={"inputContainer"}>
        <input
          value={username}
          placeholder="User Name"
          onChange={(ev) => setUsername(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={petName}
          placeholder="Pet Name"
          onChange={(ev) => setPetname(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{petNameError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={petType}
          placeholder="Pet Type"
          onChange={(ev) => setPetType(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{petTypeError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={phone}
          placeholder="Phone Number"
          onChange={(ev) => setPhone(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{phoneError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Email"
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
          placeholder="Password"
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
      <div className={"inputContainer"}>
        <input
          value={password2}
          type={showPassword2 ? "text" : "password"}
          placeholder="Repeat password"
          onChange={(ev) => setPassword2(ev.target.value)}
          className={"inputBox"}
        />
        {showPassword2 ? (
          <AiFillEye
            className="eye-icon"
            onClick={() => setShowPassword2((prevState) => !prevState)}
          />
        ) : (
          <AiFillEyeInvisible
            className="eye-icon"
            onClick={() => setShowPassword2((prevState) => !prevState)}
          />
        )}
        <label className="errorLabel">{password2Error}</label>
      </div>
      <br />
      {registerResponseMessageVisible && (
        <div
          className={
            registerResponseIsError ? "loginErrorLabel" : "signupMessageLabel"
          }
        >
          {registerResponseMessage}
        </div>
      )}
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Sign Up"}
        />
      </div>
    </div>
  );
};

export default Signup;
