import AuthForm from "../components/registration_translator/AuthForm";
import ChangePageBtn from "../components/buttons/ChangePageBtn";

export default function ResetPassword() {
  return (
    <div className="container">
      <div className="register">
        <div className="register__content">
          <h3 className="register-title">Восстановить пароль</h3>
        </div>
        <AuthForm type="resetPassword" />
        <ChangePageBtn page="resetPassword" />
      </div>
    </div>
  );
}
