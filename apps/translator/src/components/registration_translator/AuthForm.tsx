import { useForm } from "react-hook-form";
import { ControlledInputField } from "./ControlledInputField";
import { FORM_CONFIG } from "../../constans/constans";
import MainButton from "@shared/components/MainButton";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/auth";
import {
  changePassword,
  LoginTranslator,
  registerTranslator,
  sendVerificationCode,
} from "../../api/services/services";

export default function AuthForm({ type }: { type: keyof typeof FORM_CONFIG }) {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
    setError,
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    switch (type) {
      case "login":
        try {
          const cleanPhone = data.phone.replace(/[^0-9]/g, "");
          const registerData = {
            phone: cleanPhone,
            password: data.password,
          };
          const res = await LoginTranslator(registerData);
          console.log(res.token);
          const translatorData = {
            firstName: res.firstName,
            lastName: res.lastName,
          };
          auth.setToken(res.token);
          auth.setNewTranslator(translatorData);
          auth.setProfileFilled();
          navigate("/my-home-translator-page");
        } catch (err: any) {
          const serverMessage = err.response?.data.error;
          if (serverMessage === "Internal server error: User profile not found") {
            setError("phone", {
              type: "server",
              message: "Профиль пользователя не найден",
            });
          }
        }

        break;
      case "register": {
        const cleanPhone = data.phone.replace(/[^0-9]/g, "");
        const registerData = {
          phone: cleanPhone,
          password: data.password,
          confirmPassword: data.confirmPassword,
          role: "ROLE_TRANSLATOR",
        };
        try {
          const res = await registerTranslator(registerData);
          console.log(res);
          auth.setToken(res.token);
          auth.setNewTranslator(registerData.phone);
          await sendVerificationCode(res.phone);
          navigate(`/verification/register/${cleanPhone}`);
        } catch (err: any) {
          console.log(err);
          const serverMessage = err.response?.data.error;
          if (err.response?.status === 400 && serverMessage === "User profile already exists") {
            setError("phone", {
              type: "server",
              message: "Этот номер уже зарегистрирован",
            });
          } else {
            setError("root", {
              type: "server",
              message: serverMessage || "Ошибка регистрации",
            });
          }
        }
        break;
      }
      case "changePassword": {
        const changePasswordData = {
          oldPassword: data.currontPassword,
          newPassword: data.password,
          confirmPassword: data.confirmPassword,
        };
        try {
          await changePassword(changePasswordData);
          navigate(-1);
        } catch (err: any) {
          const serverMessage = err.response?.data.error;
          if (
            err.response?.status === 500 &&
            serverMessage === "Internal server error: Passwords don't match"
          ) {
            setError("currontPassword", {
              type: "server",
              message: "Не верный пароль",
            });
          } else {
            setError("root", {
              type: "server",
              message: serverMessage || "Ошибка регистрации",
            });
          }
        }
        break;
      }
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

  const fields = typeof FORM_CONFIG[type] === "function" ? FORM_CONFIG[type](getValues) : [];

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
          rules={typeof field.rules === "function" ? field.rules(getValues) : field.rules}
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
