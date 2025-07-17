import "@shared/styles/signUp.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MainButton from "@shared/components/MainButton";

interface FormData {
  password: string;
  repeatPassword: string;
}
export default function NewPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  const navigate = useNavigate();
  const [show, setShow] = useState({
    password: false,
    repeatPassword: false,
  });
  const password = watch("password");
  const repeatPassword = watch("repeatPassword");

  const isValid =
    !errors.password &&
    !errors.repeatPassword &&
    password?.trim() !== "" &&
    repeatPassword?.trim() !== "";

  const onSubmit = async (data: FormData) => {
    console.log(data);
    navigate("/home");
  };

  const toggleVisibility = (field: "password" | "repeatPassword") => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <form className="sign-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="sign-form-header">Новый пароль</h2>
      <p className="sign-form-text">
        Введите новый пароль для входа в личный кабинет
      </p>

      <label className="input-label">Пароль</label>
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
          placeholder="Введите ваш пароль"
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

      {errors.password && <p className="errors">{errors.password.message}</p>}

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
            errors.repeatPassword ? "main-input-error main-input" : "main-input"
          }
          {...register("repeatPassword", {
            required: true,
            validate: (value) => value === password || "Пароли не совпадают",
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

      {/* Кнопка */}

      <MainButton
        type="submit"
        disabled={!isValid}
        className={isValid ? "button button-active" : "button"}
        text="Войти"
      />
    </form>
  );
}
