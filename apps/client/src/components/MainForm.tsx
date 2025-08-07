import "@shared/styles/signUp.css";
import { useForm, Controller } from "react-hook-form";
import Cleave from "cleave.js/react";

import { phonePattern } from "@shared/utils/validationRules";
import { useState } from "react";
import MainButton from "@shared/components/MainButton";
import { useNavigate } from "react-router-dom";

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
  oldPassword?: string;
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
    oldPassword: false,
    confirmPassword: false,
  });

  const phone = watch("phone");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const oldPassword = watch("oldPassword");
  const navigate = useNavigate();

  const toggleVisibility = (field: keyof typeof show) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const getIcon = (value: string | undefined, error: boolean, base: string) => {
    if (!value?.trim()) return `/assets/signIcons/${base}.png`;
    return error ? `/assets/signIcons/${base}-error.png` : `/assets/signIcons/${base}-valid.png`;
  };
  const toRecoveryPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <form className="sign-form" onSubmit={handleSubmit(onSubmit)}>
      {!fields.includes("oldPassword") && <h2 className="sign-form-header">{header}</h2>}
      {!fields.includes("oldPassword") && <p className="sign-form-text">{text}</p>}

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
      {fields.includes("oldPassword") && (
        <div>
          <label className="input-label">Текущий пароль</label>
          <div className="input-wrapper">
            <img src={getIcon(oldPassword, !!errors.oldPassword, "lock")} alt="lock-img" />
            <input
              type={show.oldPassword ? "text" : "password"}
              placeholder="Введите текущий пароль"
              autoComplete="new-password"
              className={errors.oldPassword ? "main-input-error main-input" : "main-input"}
              {...register("oldPassword", {
                required: "Текущий пароль обязателен",
                minLength: {
                  value: 9,
                  message: "Пароль должен быть не менее 9 цифр",
                },
              })}
            />
            <button
              type="button"
              onClick={() => toggleVisibility("oldPassword")}
              className="password-toggle-button"
            >
              <img src={getIcon(oldPassword, !!errors.oldPassword, "eye")} alt="eye" />
            </button>
          </div>
          {errors.oldPassword && <p className="errors">{errors.oldPassword.message}</p>}
          <button type="button" className="forgot-password" onClick={toRecoveryPassword}>
            Забыл пароль
          </button>
        </div>
      )}
      {fields.includes("password") && (
        <div>
          <label className="input-label">
            {fields.includes("oldPassword") ? "Новый пароль" : "Пароль"}
          </label>
          <div className="input-wrapper">
            <img src={getIcon(password, !!errors.password, "lock")} alt="lock-img" />
            <input
              type={show.password ? "text" : "password"}
              placeholder={
                fields.includes("oldPassword") ? "Введите новый пароль" : "Введите ваш пароль"
              }
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
          {fields.includes("oldPassword") && (
            <label className="input-label">Повторите новый пароль</label>
          )}
          <div className="input-wrapper">
            <img src={getIcon(confirmPassword, !!errors.confirmPassword, "lock")} alt="lock-img" />
            <input
              type={show.confirmPassword ? "text" : "password"}
              placeholder={
                fields.includes("oldPassword") ? "Повторите новый пароль" : "Повторите ещё раз"
              }
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
