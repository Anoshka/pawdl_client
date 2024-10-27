import { useNavigate } from "react-router-dom";
import "./LogoutPage.scss";

function LogoutPage() {
  const navigate = useNavigate();

  const loginLink = () => {
    navigate("/login");
  };

  const registerLink = () => {
    navigate("/register");
  };

  return (
    <div className="input">
      <div className={"input__container"}>
        <input
          className={"input__button"}
          type="button"
          onClick={loginLink}
          value={"Log in"}
        />
      </div>
      <div className={"input__container"}>
        <input
          className={"input__button"}
          type="button"
          onClick={registerLink}
          value={"Register"}
        />
      </div>
    </div>
  );
}

export default LogoutPage;
