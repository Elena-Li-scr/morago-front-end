import "@shared/styles/signUp.css";
import { useForm, Controller } from "react-hook-form";
import Cleave from "cleave.js/react";
import { useNavigate } from "react-router-dom";
import { phonePattern } from "@shared/utils/validationRules";
import MainButton from "@shared/components/MainButton";
import { useState } from "react";

interface FormData {
  phone: string;
}

export default function ForgotPassword() {
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  const navigate = useNavigate();
  const [userInterface, setUserInterface] = useState(true);

  const phone = watch("phone");
  const phoneIsEmpty = !phone || phone.replace(/\s/g, "") === "";

  const isValid = !errors.phone && !phoneIsEmpty;

  const onSubmit = async (data: FormData) => {
    console.log(data);
    navigate("/forgot-password-code");
  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <form className="sign-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="sign-form-header">
        Восстановить <br /> пароль
      </h2>

      <div className="interface-toggle-buttons">
        <button
          type="button"
          className={
            userInterface
              ? "user-interface user-interface-active"
              : "user-interface"
          }
          onClick={() => setUserInterface(true)}
        >
          Я пользователь
        </button>
        <button
          type="button"
          className={
            !userInterface
              ? "user-interface user-interface-active"
              : "user-interface"
          }
          onClick={() => setUserInterface(false)}
        >
          Я переводчик
        </button>
      </div>

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

      {/* Кнопка */}

      <MainButton
        type="submit"
        disabled={!isValid}
        className={isValid ? "button button-active" : "button"}
        text="Сбросить пароль"
      />

      <MainButton
        type="button"
        className="button password-back-button"
        text="Назад"
        onClick={goBack}
        bgColor="#F8F9FB"
      />

      {/* <button type="button" onClick={goBack} className="back-button">
        Назад
      </button> */}
    </form>
  );
}
