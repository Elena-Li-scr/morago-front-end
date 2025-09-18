import React, { useState } from "react";
import { Controller, type Path, type Control, type FieldValues } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ChangePageBtn from "../buttons/ChangePageBtn";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  rules?: any;
  icon?: React.ReactNode;
  format?: (value: string) => string;
  balance?: string;
};

export function ControlledInputField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  icon,
  format,
  type = "text",
  rules,
  balance,
}: Props<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="register-block">
      {label && (
        <label className="register-label" htmlFor={name}>
          {label}
          {name === "won" && (
            <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "1.5px" }}>
              (Баланс {balance} вон)
            </span>
          )}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value, ...rest }, fieldState: { error } }) => (
          <>
            <div className="register-input" style={{ position: "relative" }}>
              {icon && <span className="register-icon">{icon}</span>}
              <input
                {...rest}
                id={name}
                autoComplete={
                  name === " password"
                    ? "new-password"
                    : name === "confirmPassword"
                      ? "new-password"
                      : "off"
                }
                type={isPassword && showPassword ? "text" : type}
                value={value || ""}
                placeholder={placeholder}
                className={`input ${error ? "input-error" : ""}`}
                onChange={(e) => {
                  const raw = e.target.value;
                  const formatted = format ? format(raw) : raw;
                  onChange(formatted);
                }}
              />
              {isPassword && (
                <button
                  type="button"
                  aria-pressed={showPassword}
                  className="register-icon register-eye-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              )}
            </div>
            {error && <p className="register-validate">{error.message}</p>}
            {name === "currentPassword" && <ChangePageBtn page="changePassword" />}
          </>
        )}
      />
    </div>
  );
}
