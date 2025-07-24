import AuthForm from "../components/registration_translator/AuthForm";
import ChangePageBtn from "../components/buttons/ChangePageBtn";

export default function ChangePassword() {
  return (
    <div className="container">
      <div className="verification change-password">
        <div className="change-password-header">
          <ChangePageBtn page="changePasswordIkconBack" />
          <h2 className="change-password-title">Изменить пароль</h2>
        </div>
        <AuthForm type="changePassword" />
      </div>
    </div>
  );
}
