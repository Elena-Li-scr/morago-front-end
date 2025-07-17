import { useForm } from "react-hook-form";
import { useRef } from "react";
import MainButton from "@shared/components/MainButton";

import "@shared/styles/signUp.css";

interface Props {
  onSubmit: (data: Code) => void;
}

interface Code {
  num1: string;
  num2: string;
  num3: string;
  num4: string;
}

export default function CodeForm({ onSubmit }: Props) {
  const { register, handleSubmit, setValue, getValues, watch } = useForm<Code>({
    mode: "onChange",
  });

  const inputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const fieldNames = ["num1", "num2", "num3", "num4"] as const;
  const watchedValues = watch(["num1", "num2", "num3", "num4"]);
  const isComplete = watchedValues.every((v) => v && v.length === 1);

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
  );
}
