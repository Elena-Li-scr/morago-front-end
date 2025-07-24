import "@shared/styles/signUp.css";
import { useForm, Controller } from "react-hook-form";
import Cleave from "cleave.js/react";
import { useNavigate } from "react-router-dom";
import { phonePattern } from "@shared/utils/validationRules";
import MainButton from "@shared/components/MainButton";
import { useState } from "react";

interface FormData {
  phone: string;
  password: string;
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const phone = watch("phone");
  const phoneIsEmpty = !phone || phone.replace(/\s/g, "") === "";
  const password = watch("password");

  const isValid =
    !errors.phone &&
    !errors.password &&
    !phoneIsEmpty &&
    password?.trim() !== "";

  const onSubmit = (data: FormData) => {
    console.log(data);
    navigate("/home");
  };

  return (
    <form className="sign-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="sign-form-header">Войдите</h2>
      <p className="sign-form-text">
        Войдите, чтобы воспользоваться всеми преимуществами приложения
      </p>

      {/* phone number  */}

      <label className="input-label">Номер телефона</label>
      <div className="input-wrapper">
        <img
          src={
            phoneIsEmpty
              ? "/assets/signIcons/call.png"
              : errors.phone
              ? "/assets/signIcons/call-error.png"
              : "/assets/signIcons/call-valid.png"
          }
          alt="call-img"
        />

        <Controller
          control={control}
          name="phone"
          rules={{
            required: true,
            pattern: phonePattern,
          }}
          render={({ field }) => (
            <Cleave
              {...field}
              options={{
                delimiters: [" ", " ", " "],
                blocks: [3, 4, 2, 2],
                numericOnly: true,
              }}
              placeholder="Введите номер телефона без “-”"
              className={
                errors.phone ? "main-input main-input-error" : "main-input"
              }
              autoComplete="tel"
            />
          )}
        />
      </div>
      {errors.phone && <p className="errors">{errors.phone.message}</p>}

      {/*password*/}

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
          type={show ? "text" : "password"}
          placeholder="Введите ваш пароль"
          autoComplete="current-password"
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
          onClick={() => setShow(!show)}
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

      {/* Кнопки */}

      <MainButton
        type="submit"
        text="Войти"
        disabled={!isValid}
        className={isValid ? "button button-active" : "button"}
      />
      <MainButton
        type="button"
        text="Зарегистрироваться"
        onClick={() => navigate("/sign-up")}
        bgColor="#F8F9FB"
        className="button password-back-button"
      />
      <button
        className="to-forgot-password-page"
        type="button"
        onClick={() => navigate("/forgot-password")}
      >
        Забыли пароль
      </button>
    </form>
  );
}
