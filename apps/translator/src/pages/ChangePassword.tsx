import React, { useState } from "react";
import {
  defaultChangePasswordData,
  type ChangePasswordErrors,
} from "../types/types";
import { InputField } from "../components/registration_translator/InputField";
import { LuLock } from "react-icons/lu";
import { handleInput, showPasswordIcon } from "../utils/inputValidate";
import { MdKeyboardBackspace } from "react-icons/md";
import MainButton from "@shared/components/MainButton";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [formData, setFormData] = useState(defaultChangePasswordData);
  const [errors, setErrors] = useState<ChangePasswordErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    handleInput(formData, e.target, setFormData, setErrors);
  };
  const isFilled =
    formData.currentPassword &&
    formData.newPassword &&
    formData.confirmNewPassword &&
    !errors.currentPassword &&
    !errors.newPassword &&
    !errors.confirmNewPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Изменение пароля:", formData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="verification change-password">
        <div className="change-password-header">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="back-button"
          >
            <MdKeyboardBackspace className="back-icon" />
          </button>
          <h2 className="change-password-title">Изменить пароль</h2>
        </div>
        <div className="change-password-inputs">
          <InputField
            label="Текущий пароль"
            name="currentPassword"
            type={showPassword ? "text" : "password"}
            value={formData.currentPassword}
            handleChange={handleChange}
            placeholder="Введите старый пароль"
            icon={
              <LuLock
                className={`register-icon ${
                  errors.currentPassword ? "error" : ""
                }`}
              />
            }
            passwordIkcon={showPasswordIcon(
              showPassword,
              errors.confirmNewPassword
            )}
            setShowPassword={setShowPassword}
          />
          <p className="change-password-help">Забыл пароль</p>

          <InputField
            label=" Новый пароль"
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            value={formData.newPassword}
            handleChange={handleChange}
            placeholder="Введите новый пароль"
            icon={
              <LuLock
                className={`register-icon ${errors.newPassword ? "error" : ""}`}
              />
            }
            passwordIkcon={showPasswordIcon(
              showNewPassword,
              errors.confirmNewPassword
            )}
            setShowPassword={setShowNewPassword}
          />

          <InputField
            label="Повторите новый пароль"
            name="confirmNewPassword"
            type={showRepeatPassword ? "text" : "password"}
            value={formData.confirmNewPassword}
            handleChange={handleChange}
            placeholder="Повторите новый пароль"
            icon={
              <LuLock
                className={`register-icon ${
                  errors.confirmNewPassword ? "error" : ""
                }`}
              />
            }
            passwordIkcon={showPasswordIcon(
              showRepeatPassword,
              errors.confirmNewPassword
            )}
            setShowPassword={setShowRepeatPassword}
          />
        </div>
        <MainButton
          type="submit"
          disabled={!isFilled}
          className={isFilled ? "button active" : "button"}
          text="Сохранить изменения"
        />
      </form>
    </div>
  );
}
