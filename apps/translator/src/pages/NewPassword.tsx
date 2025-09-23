import AuthForm from "../components/registration_translator/AuthForm";

export default function NewPassword() {
  return (
    <div className="container">
      <div className="register">
        <div className="register__content">
          <h3 className="register-title">Новый пароль</h3>
          <p className="register-text">
            Зарегистрируйтесь в приложении и начните зарабатывать реальные
            деньги
          </p>
        </div>
        <AuthForm type="newPassword" />
      </div>
    </div>
  );
}
