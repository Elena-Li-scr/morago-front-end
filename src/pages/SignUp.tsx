import "../styles/signUp.css";
import { useForm, Controller } from "react-hook-form";
import Cleave from "cleave.js/react";
import { Link, useNavigate } from "react-router-dom";
import { newUser } from "../services/api";
import { phonePattern } from "../utils/validationRules";
import { useState } from "react";

interface FormData {
  phone: string;
  password: string;
  repeatPassword: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  const navigate = useNavigate();
  const [show, setShow] = useState({
    password: false,
    repeatPassword: false,
  });
  const phone = watch("phone");
  const phoneIsEmpty = !phone || phone.replace(/\s/g, "") === "";
  const password = watch("password");
  const repeatPassword = watch("repeatPassword");

  const isValid =
    !errors.phone &&
    !errors.password &&
    !errors.repeatPassword &&
    !phoneIsEmpty &&
    password?.trim() !== "" &&
    repeatPassword?.trim() !== "";

  const onSubmit = async (data: FormData) => {
    const request = {
      user: {
        phone: data.phone,
        password: data.password,
      },
    };
    try {
      const response = await newUser({ request });

      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleVisibility = (field: "password" | "repeatPassword") => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <form className="sign-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="sign-form-header">
        Регистрация <br /> пользователя
      </h2>
      <p className="sign-form-text">
        Зарегистрируйтесь, чтобы получить доступ ко всем преимуществам
        приложения
      </p>

      {/* phone number  */}

      <label>Номер телефона</label>
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
                errors.phone
                  ? "sign-form-input sign-form-input-error"
                  : "sign-form-input"
              }
              autoComplete="tel"
            />
          )}
        />
      </div>
      {errors.phone && <p className="errors">{errors.phone.message}</p>}

      {/*password*/}

      <label>Пароль</label>
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
            errors.password
              ? "sign-form-input-error sign-form-input"
              : "sign-form-input"
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
            errors.repeatPassword
              ? "sign-form-input-error sign-form-input"
              : "sign-form-input"
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

      <button
        type="submit"
        disabled={!isValid}
        className={isValid ? "sign-button sign-button-active" : "sign-button"}
      >
        Получить код
      </button>
      <p className="sign-form-note">
        <Link to="/sign-in" className="link-to-sign">
          Уже есть аккаунт
        </Link>
      </p>
      <p className="personal-data-warning">
        Нажимая на кнопку, вы даете согласие на обработку своих персональных
        данных
      </p>
    </form>
  );
}
