import { useNavigate } from "react-router-dom";
import "../assets/style/register.css";
import MainButton from "@shared/components/MainButton";
import "@shared/styles/signUp.css";
import AuthForm from "../components/registration_translator/AuthForm";
import ChangePageBtn from "../components/buttons/ChangePageBtn";

export default function LogIn() {
  const navigate = useNavigate();

  const ToRegisterhandler = () => {
    navigate("/register");
  };

  return (
    <div className="container">
      <div className="register">
        <div className="register__content">
          <h3 className="register-title">Войдите</h3>
          <p className="register-text">
            Войдите, чтобы воспользоваться всеми преимуществами приложения
          </p>
        </div>
        <AuthForm type="login" />
        <MainButton
          type="submit"
          className={"login-btn"}
          text="Зарегистрироваться"
          onClick={ToRegisterhandler}
        />
        <div className="register-footer">
          <ChangePageBtn page="login" />
        </div>
      </div>
    </div>
  );
}
