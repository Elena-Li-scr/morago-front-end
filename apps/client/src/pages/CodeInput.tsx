import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import SucessActionModal from "@shared/components/SucessActionModal";
import MainButton from "@shared/components/MainButton";
import BackButton from "@shared/components/BackButton";

import "@shared/styles/signUp.css";

interface Code {
  num1: string;
  num2: string;
  num3: string;
  num4: string;
}

export default function CodeInput() {
  const { register, handleSubmit, setValue, getValues, watch } = useForm<Code>({
    mode: "onChange",
  });

  const [success, setSuccess] = useState(false);

  const inputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const fieldNames = ["num1", "num2", "num3", "num4"] as const;
  const watchedValues = watch(["num1", "num2", "num3", "num4"]);
  const isComplete = watchedValues.every((v) => v && v.length === 1);

  const onSubmit = (data: Code) => {
    const code = fieldNames.map((key) => data[key]).join("");
    setSuccess(true);
    console.log("Verification code:", code);
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    setValue(fieldNames[index], value);

    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      const current = getValues(fieldNames[index]);
      if (!current && index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  return (
    <div className="code-container">
      <BackButton icon="/assets/arrow-left.png" />
      <h2 className="code-header">Проверочный код</h2>
      <p className="sign-form-text">
        Мы отправили проверочный <br /> код на ваш номер телефона{" "}
      </p>
      <form className="code-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="code-form-inputs">
          {fieldNames.map((name, index) => (
            <input
              key={name}
              type="text"
              maxLength={1}
              inputMode="numeric"
              autoComplete="one-time-code"
              className="code-form-input"
              {...register(name, { required: true })}
              ref={(el) => {
                inputRefs[index].current = el;
              }}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>

        <MainButton
          type="submit"
          text="Подтвердить"
          className={isComplete ? "button button-active" : "button"}
        />

        <div className="code-repeat">
          <p>Не получили код? </p>
          <button type="button">Ещё раз</button>
        </div>
      </form>

      {success && (
        <SucessActionModal
          header="Регистрация
            прошла успешно"
          text="Теперь вы можете полноценно воспользоваться всеми возможностями"
          btn="Здорово!"
          bgImg="/assets/signIcons/success-note.png"
          className="button button-active"
        />
      )}
    </div>
  );
}
