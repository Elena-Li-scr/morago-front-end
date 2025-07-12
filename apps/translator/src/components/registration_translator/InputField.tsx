import React from "react";

type InputFieldProps = {
  label?: string;
  name: string;
  type?: string;
  errors?: string | [];
  value: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  passwordIkcon?: React.ReactNode;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  errors,
  value,
  handleChange,
  placeholder,
  icon,
  passwordIkcon,
  setShowPassword,
}) => {
  return (
    <div className="register-block">
      <label className="register-label">{label}</label>
      <div className="register-input">
        {icon}
        <input
          maxLength={label === "Уровень TOPIK" ? 1 : 9999999}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`input ${errors ? "error" : ""}`}
        />
        {value && name === "topikLevel" && (
          <span
            style={{
              position: "absolute",
              top: "14px",
              left: "64px",
              fontSize: "14px",
            }}
          >
            уровень
          </span>
        )}
        <button
          type="button"
          className={`register-icon  register-eye-icon   ${
            errors ? "error" : ""
          }`}
          onClick={() => setShowPassword?.((prev) => !prev)}
        >
          {passwordIkcon && passwordIkcon}
        </button>
      </div>
      {errors && <p className="register-validate">{errors}</p>}
    </div>
  );
};
