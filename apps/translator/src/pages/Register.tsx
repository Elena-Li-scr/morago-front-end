import "../assets/style/register.css";
import "@shared/styles/signUp.css";
import AuthForm from "../components/registration_translator/AuthForm";
import ChangePageBtn from "../components/buttons/ChangePageBtn";

export default function RegisterForm() {
  return (
    <div className="container">
      <div className="register">
        <div className="register__content">
          <h3 className="register-title">Регистрация переводчика</h3>
          <p className="register-text">
            Зарегистрируйтесь в приложении и начните зарабатывать реальные
            деньги
          </p>
        </div>
        <AuthForm type="register" />
        <div className="register-footer">
          <ChangePageBtn page="register" />
          <p className="register-agree-desc">
            Нажимая на кнопку, вы даете согласие на обработку своих{" "}
            <span>персональных данных</span>
          </p>
        </div>
      </div>
    </div>
  );
}
