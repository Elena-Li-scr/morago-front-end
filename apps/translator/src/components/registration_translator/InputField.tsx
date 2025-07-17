import React from "react";
import { koreanBanks } from "../../constans/constans";

type InputFieldProps = {
  label?: string;
  name: string;
  type?: string;
  errors?: string | [];
  value: string | number;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
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
  const isSelect = name === "bankName";
  const isNumeric = name === "bankAccount" || name === "balance";
  const isBalance = name === "balance";
  return (
    <div className="register-block">
      <label className="register-label">
        {label}
        {isBalance && (
          <span className="register-label-balance">(Баланс 300.000 вон)</span>
        )}
      </label>
      {isSelect ? (
        <div className="register-input">
          {icon}
          <select
            name={name}
            className="select-input input"
            value={value}
            onChange={handleChange}
          >
            <option value="">{placeholder}</option>
            {koreanBanks.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="register-input">
          {icon}
          <input
            maxLength={label === "Уровень TOPIK" ? 1 : 9999999}
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            inputMode={isNumeric ? "numeric" : "none"}
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
      )}
      {errors && <p className="register-validate">{errors}</p>}
    </div>
  );
};
