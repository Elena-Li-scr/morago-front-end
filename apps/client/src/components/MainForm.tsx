import "@shared/styles/signUp.css";
import { useForm, Controller } from "react-hook-form";
import Cleave from "cleave.js/react";

import { phonePattern } from "@shared/utils/validationRules";
import { useState } from "react";
import MainButton from "@shared/components/MainButton";

interface Props {
  onSubmit: (data: any) => void | Promise<void>; // eslint-disable-line
  serverError: string;
  header: string;
  text?: string;
  fields: string[];
  button: string;
  button2?: string;
  onClick?: () => void;
}

interface FormData {
  password?: string;
  confirmPassword?: string;
  phone?: string;
  role?: string;
}

export default function MainForm({
  onSubmit,
  serverError,
  header,
  text,
  fields,
  button,
  button2,
  onClick,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const phone = watch("phone");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const toggleVisibility = (field: keyof typeof show) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const getIcon = (value: string | undefined, error: boolean, base: string) => {
    if (!value?.trim()) return `/assets/signIcons/${base}.png`;
    return error ? `/assets/signIcons/${base}-error.png` : `/assets/signIcons/${base}-valid.png`;
  };

  return (
    <form className="sign-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="sign-form-header">{header}</h2>
      <p className="sign-form-text">{text}</p>

      {fields.includes("phone") && (
        <div>
          <label className="input-label">Номер телефона</label>
          <div className="input-wrapper">
            <img src={getIcon(phone, !!errors.phone, "call")} alt="call-img" />

            <Controller
              control={control}
              name="phone"
              rules={{ required: true, pattern: phonePattern }}
              render={({ field }) => (
                <Cleave
                  {...field}
                  options={{
                    delimiters: [" ", " ", " "],
                    blocks: [3, 4, 2, 2],
                    numericOnly: true,
                  }}
                  placeholder="Введите номер телефона без “-”"
                  className={errors.phone ? "main-input main-input-error" : "main-input"}
                  autoComplete="tel"
                />
              )}
            />
          </div>
          {errors.phone && <p className="errors">{errors.phone.message}</p>}
        </div>
      )}
      {fields.includes("password") && (
        <div>
          <label className="input-label">Пароль</label>
          <div className="input-wrapper">
            <img src={getIcon(password, !!errors.password, "lock")} alt="lock-img" />
            <input
              type={show.password ? "text" : "password"}
              placeholder="Введите ваш пароль"
              autoComplete="new-password"
              className={errors.password ? "main-input-error main-input" : "main-input"}
              {...register("password", {
                required: "Пароль обязателен",
                minLength: {
                  value: 9,
                  message: "Пароль должен быть не менее 9 цифр",
                },
                validate: (value) => value?.trim() !== "" || "Поле не может быть пустым",
              })}
            />
            <button
              type="button"
              onClick={() => toggleVisibility("password")}
              className="password-toggle-button"
            >
              <img src={getIcon(password, !!errors.password, "eye")} alt="eye" />
            </button>
          </div>
          {errors.password && <p className="errors">{errors.password.message}</p>}
        </div>
      )}

      {fields.includes("confirmPassword") && (
        <div>
          <div className="input-wrapper">
            <img src={getIcon(confirmPassword, !!errors.confirmPassword, "lock")} alt="lock-img" />
            <input
              type={show.confirmPassword ? "text" : "password"}
              placeholder="Повторите ещё раз"
              autoComplete="new-password"
              className={errors.confirmPassword ? "main-input-error main-input" : "main-input"}
              {...register("confirmPassword", {
                required: "Подтвердите пароль",
                validate: (value) => value === password || "Пароли не совпадают",
              })}
            />
            <button
              type="button"
              onClick={() => toggleVisibility("confirmPassword")}
              className="password-toggle-button"
            >
              <img src={getIcon(confirmPassword, !!errors.confirmPassword, "eye")} alt="eye" />
            </button>
          </div>
          {errors.confirmPassword && <p className="errors">{errors.confirmPassword.message}</p>}
        </div>
      )}

      {serverError && <p className="errors">{serverError}</p>}

      <MainButton
        type="submit"
        disabled={!isValid}
        className={isValid ? "button button-active" : "button"}
        text={button}
      />
      {button2 && (
        <MainButton
          type="button"
          text={button2}
          onClick={onClick}
          bgColor="#F8F9FB"
          className="button password-back-button"
        />
      )}
    </form>
  );
}
