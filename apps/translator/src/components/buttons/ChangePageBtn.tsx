import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface Props {
  page: string;
}

export default function ChangePageBtn({ page }: Props) {
  const navigate = useNavigate();

  const buttonMap: Record<
    string,
    { text?: string; onClick: () => void; className: string; icon?: boolean }
  > = {
    register: {
      text: "Уже есть аккаунт",
      onClick: () => navigate("/login"),
      className: "register-link-acc",
    },
    login: {
      text: "Забыли пароль",
      onClick: () => navigate("/reset-password"),
      className: "register-link-acc",
    },
    resetPassword: {
      text: "Назад",
      onClick: () => navigate(-1),
      className: "button reset-password-btn",
    },
    withdrawalIkconBack: {
      onClick: () => navigate("/my-balance-translator-page"),
      className: "back-button",
      icon: true,
    },
    changePasswordIkconBack: {
      onClick: () => navigate(-1),
      className: "back-button",
      icon: true,
    },
    changePassword: {
      text: "Забыли пароль",
      onClick: () => navigate("/reset-password"),
      className: "change-password-help",
    },
  };

  const config = buttonMap[page];

  if (!config) return null;

  return (
    <button type="button" onClick={config.onClick} className={config.className}>
      {config.icon ? (
        <MdKeyboardBackspace className="back-icon" />
      ) : (
        config.text
      )}
    </button>
  );
}
