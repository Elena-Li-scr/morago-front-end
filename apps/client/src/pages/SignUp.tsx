import "@shared/styles/signUp.css";
import { useForm, Controller } from "react-hook-form";
import Cleave from "cleave.js/react";
import { Link, useNavigate } from "react-router-dom";
import { newUser } from "@shared/services/clientApi";
import { phonePattern } from "@shared/utils/validationRules";
import { useState } from "react";
import MainButton from "@shared/components/MainButton";

interface FormData {
  password: string;
  confirmPassword: string;
  phone: string;
  role: string;
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
    confirmPassword: false,
  });
  const phone = watch("phone");
  const phoneIsEmpty = !phone || phone.replace(/\s/g, "") === "";
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isValid =
    !errors.phone &&
    !errors.password &&
    !errors.confirmPassword &&
    !phoneIsEmpty &&
    password?.trim() !== "" &&
    confirmPassword?.trim() !== "";

  const onSubmit = async (data: FormData) => {
    const payload = {
      user: {
        password: data.password,
        confirmPassword: data.confirmPassword,
        phone: data.phone,
        role: "ROLE_USER",
      },
    };

    try {
      const response = await newUser(payload);
      console.log(response.data);
      navigate("/code");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleVisibility = (field: "password" | "confirmPassword") => {
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
        Зарегистрируйтесь, чтобы получить доступ ко всем преимуществам приложения
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
              className={errors.phone ? "main-input main-input-error" : "main-input"}
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
          type={show.password ? "text" : "password"}
          placeholder="Введите ваш пароль"
          autoComplete="new-password"
          className={errors.password ? "main-input-error main-input" : "main-input"}
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
            confirmPassword?.trim() === ""
              ? "/assets/signIcons/lock.png"
              : errors.confirmPassword
                ? "/assets/signIcons/lock-error.png"
                : "/assets/signIcons/lock-valid.png"
          }
          alt="lock-img"
        />
        <input
          type={show.confirmPassword ? "text" : "password"}
          placeholder="Повторите ещё раз"
          autoComplete="new-password"
          className={errors.confirmPassword ? "main-input-error main-input" : "main-input"}
          {...register("confirmPassword", {
            required: true,
            validate: (value) => value === password || "Пароли не совпадают",
          })}
        />
        <button
          type="button"
          onClick={() => toggleVisibility("confirmPassword")}
          className="password-toggle-button"
        >
          <img
            src={
              confirmPassword?.trim() === ""
                ? "/assets/signIcons/eye.png"
                : errors.confirmPassword
                  ? "/assets/signIcons/eye-error.png"
                  : "/assets/signIcons/eye-valid.png"
            }
            alt="eye"
          />
        </button>
      </div>

      {errors.confirmPassword && <p className="errors">{errors.confirmPassword.message}</p>}

      {/* Кнопка */}

      <MainButton
        type="submit"
        disabled={!isValid}
        className={isValid ? "button button-active" : "button"}
        text="Получить код"
      />

      <p className="sign-form-note">
        <Link to="/sign-in" className="link-to-sign">
          Уже есть аккаунт
        </Link>
      </p>
      <p className="personal-data-warning">
        Нажимая на кнопку, вы даете согласие на обработку своих персональных данных
      </p>
    </form>
  );
}
