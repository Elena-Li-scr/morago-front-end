import { useForm, type SubmitHandler } from "react-hook-form";
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
} from "@shared/services/translatorApi";
import type { AxiosError } from "axios";
import type { ChangePasswordData, RegisterFormValues } from "@shared/types/types";
export default function AuthForm({ type }: { type: keyof typeof FORM_CONFIG }) {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
    setError,
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<RegisterFormValues | ChangePasswordData> = async (data) => {
    switch (type) {
      case "login":
        try {
          const formData = data as RegisterFormValues;
          const cleanPhone = formData.phone?.replace(/[^0-9]/g, "");
          const registerData = {
            phone: cleanPhone,
            password: formData.password,
          };
          const res = await LoginTranslator(registerData);
          console.log(res);

          auth.setToken(res.data.token);
          auth.setNewTranslator({
            firstName: res.data.firstName,
            phone: res.data.phone,
            lastName: res.data.lastName,
            dateOfBirth: res.data.dateOfBirth,
            levelOfKorean: res.data.levelOfKorean,
            imageUrl: res.data.imageUrl,
            languageIds: res.data.selectedLanguageIds,
            themeIds: res.data.selectedThemeIds,
          });
          auth.setVerified();
          auth.setProfileFilled();
          navigate("/my-home-translator-page");
        } catch (err) {
          const axiosErr = err as AxiosError<{ error: string }>;
          const serverMessage = axiosErr.response?.data.error;
          if (serverMessage === "Internal server error: User profile not found") {
            setError("phone", {
              type: "server",
              message: "Профиль пользователя не найден",
            });
          }
        }
        break;
      case "register": {
        const formData = data as RegisterFormValues;
        const cleanPhone = formData.phone?.replace(/[^0-9]/g, "");
        const registerData = {
          phone: cleanPhone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          role: "ROLE_TRANSLATOR",
        };
        try {
          const res = await registerTranslator(registerData);
          if (res.data.token && res.data.phone) {
            auth.setToken(res.data.token);
            auth.setNewTranslator(res.data);
            await sendVerificationCode(res.data.phone);
            navigate(`/verification/register/${cleanPhone}`);
          }
        } catch (err) {
          const axiosErr = err as AxiosError<{ error: string }>;
          const serverMessage = axiosErr.response?.data.error;
          if (
            axiosErr.response?.status === 400 &&
            serverMessage === "User profile already exists"
          ) {
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
        const formData = data as ChangePasswordData;
        const changePasswordData = {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        };
        try {
          await changePassword(changePasswordData);
          navigate(-1);
        } catch (err) {
          const axiosErr = err as AxiosError<{ error: string }>;
          const serverMessage = axiosErr.response?.data.error;
          if (
            axiosErr.response?.status === 500 &&
            serverMessage === "Internal server error: Passwords don't match"
          ) {
            setError("currentPassword", {
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
      case "resetPassword": {
        const formData = data as RegisterFormValues;
        // await requestResetCode(data.phone);
        navigate(`/verification/reset/${formData.phone}`);
        break;
      }
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
