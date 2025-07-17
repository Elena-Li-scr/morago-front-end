import "@shared/styles/profile.css";
import BackButton from "@shared/components/BackButton";
import MainButton from "@shared/components/MainButton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  password: string;
  newPassword: string;
  repeatPassword: string;
}

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  const [show, setShow] = useState({
    password: false,
    newPassword: false,
    repeatPassword: false,
  });

  const newPassword = watch("newPassword");
  const password = watch("password");
  const repeatPassword = watch("repeatPassword");

  const toggleVisibility = (
    field: "password" | "repeatPassword" | "newPassword"
  ) => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const toRecoveryPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="change-profile-wrapper">
      <div className="change-profile-header">
        <BackButton icon="/assets/arrow-left.png" />
        <h3>Изменить пароль</h3>
      </div>
      <form className="change-profile-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Текущий пароль */}

          <label className="input-label">Текущий пароль</label>
          <div className="input-wrapper">
            <img
              src={
                password?.trim() === ""
                  ? "/assets/signIcons/lock.png"
                  : errors.password
                  ? "/assets/signIcons/lock-error.png"
                  : "/assets/signIcons/lock-valid.png"
              }
              alt="lock-img"
            />
            <input
              type={show.password ? "text" : "password"}
              placeholder="Введите текущий пароль"
              autoComplete="new-password"
              className={
                errors.password ? "main-input-error main-input" : "main-input"
              }
              {...register("password", {
                required: true,
                minLength: {
                  value: 9,
                  message: "Пароль должен быть не менее 9 цифр",
                },
              })}
            />
            <button
              type="button"
              onClick={() => toggleVisibility("password")}
              className="password-toggle-button"
            >
              <img
                src={
                  password?.trim() === ""
                    ? "/assets/signIcons/eye.png"
                    : errors.password
                    ? "/assets/signIcons/eye-error.png"
                    : "/assets/signIcons/eye-valid.png"
                }
                alt="eye"
              />
            </button>
          </div>

          {errors.password && (
            <p className="errors">{errors.password.message}</p>
          )}

          <button
            type="button"
            className="forgot-password"
            onClick={toRecoveryPassword}
          >
            Забыл пароль
          </button>

          {/* Новый пароль */}

          <label className="input-label">Новый пароль</label>
          <div className="input-wrapper">
            <img
              src={
                newPassword?.trim() === ""
                  ? "/assets/signIcons/lock.png"
                  : errors.newPassword
                  ? "/assets/signIcons/lock-error.png"
                  : "/assets/signIcons/lock-valid.png"
              }
              alt="lock-img"
            />
            <input
              type={show.newPassword ? "text" : "password"}
              placeholder="Введите ваш пароль"
              autoComplete="new-password"
              className={
                errors.newPassword
                  ? "main-input-error main-input"
                  : "main-input"
              }
              {...register("newPassword", {
                required: true,
                minLength: {
                  value: 9,
                  message: "Пароль должен быть не менее 9 цифр",
                },
              })}
            />
            <button
              type="button"
              onClick={() => toggleVisibility("newPassword")}
              className="password-toggle-button"
            >
              <img
                src={
                  newPassword?.trim() === ""
                    ? "/assets/signIcons/eye.png"
                    : errors.newPassword
                    ? "/assets/signIcons/eye-error.png"
                    : "/assets/signIcons/eye-valid.png"
                }
                alt="eye"
              />
            </button>
          </div>

          {errors.newPassword && (
            <p className="errors">{errors.newPassword.message}</p>
          )}
          {/* Повторите новый пароль */}

          <label className="input-label">Повторите новый пароль</label>

          <div className="input-wrapper">
            <img
              src={
                repeatPassword?.trim() === ""
                  ? "/assets/signIcons/lock.png"
                  : errors.repeatPassword
                  ? "/assets/signIcons/lock-error.png"
                  : "/assets/signIcons/lock-valid.png"
              }
              alt="lock-img"
            />
            <input
              type={show.repeatPassword ? "text" : "password"}
              placeholder="Повторите ещё раз"
              autoComplete="new-password"
              className={
                errors.repeatPassword
                  ? "main-input-error main-input"
                  : "main-input"
              }
              {...register("repeatPassword", {
                required: true,
                validate: (value) =>
                  value === newPassword || "Пароли не совпадают",
              })}
            />
            <button
              type="button"
              onClick={() => toggleVisibility("repeatPassword")}
              className="password-toggle-button"
            >
              <img
                src={
                  repeatPassword?.trim() === ""
                    ? "/assets/signIcons/eye.png"
                    : errors.repeatPassword
                    ? "/assets/signIcons/eye-error.png"
                    : "/assets/signIcons/eye-valid.png"
                }
                alt="eye"
              />
            </button>
          </div>

          {errors.repeatPassword && (
            <p className="errors">{errors.repeatPassword.message}</p>
          )}
        </div>
        <MainButton
          text="Сохранить изменения"
          type="submit"
          className="button button-active"
        />
      </form>
    </div>
  );
}
