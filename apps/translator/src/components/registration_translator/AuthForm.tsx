import { useForm } from "react-hook-form";
import { ControlledInputField } from "./ControlledInputField";
import { FORM_CONFIG } from "../../constans/constans";
import MainButton from "@shared/components/MainButton";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/auth";

export default function AuthForm({ type }: { type: keyof typeof FORM_CONFIG }) {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    switch (type) {
      case "login":
        // await login(data.phone, data.password);
        navigate("/my-home-translator-page");
        break;
      case "register":
        // await register(data.phone, data.password);
        auth.setToken("fake-token");
        navigate(`/verification/register/${data.phone}`);
        break;
      case "changePassword":
        // await requestResetCode(data.phone);
        navigate(-1);
        break;
      case "newPassword":
        // await setNewPassword(data.password);
        navigate("/my-home-translator-page");
        break;
      case "resetPassword":
        // await requestResetCode(data.phone);
        navigate(`/verification/reset/${data.phone}`);
        break;
    }
  };

  const fields =
    typeof FORM_CONFIG[type] === "function" ? FORM_CONFIG[type](getValues) : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      {fields.map((field) => (
        <ControlledInputField
          key={field.name}
          icon={field.icon}
          name={field.name}
          control={control}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          format={field.format}
          rules={
            typeof field.rules === "function"
              ? field.rules(getValues)
              : field.rules
          }
        />
      ))}

      <MainButton
        type="submit"
        disabled={!isValid}
        className={isValid ? "button active" : "button"}
        text={
          type === "login" || type === "newPassword"
            ? "Войти"
            : type === "register"
            ? "Получить код"
            : type === "changePassword"
            ? "Сохранить изменения"
            : type === "resetPassword"
            ? "Сбросить пароль"
            : "Сменить пароль"
        }
      />
    </form>
  );
}
