import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuLock } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import { InputField } from "../components/registration_translator/InputField";
import { handleInput, showPasswordIcon } from "../utils/inputValidate";
import { defaultData, type FormErrors } from "../types/types";
import { newUser } from "@shared/services/api";
import "../assets/style/register.css";
import MainButton from "@shared/components/MainButton";

import "@shared/styles/signUp.css";

export default function RegisterForm() {
  const [formData, setFormData] = useState(defaultData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    handleInput(formData, e.target, setFormData, setErrors);
  };

  const isFilled =
    formData.phone &&
    formData.password &&
    formData.confirmPassword &&
    !errors.phone &&
    !errors.password &&
    !errors.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      user: {
        phone: formData.phone.replace(/\s/g, ""),
        password: formData.password,
      },
    };
    try {
      navigate("/verification");
      const response = await newUser(payload);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="register">
        <div className="register__content">
          <h3 className="register-title">Регистрация переводчика</h3>
          <p className="register-text">
            Зарегистрируйтесь в приложении и начните зарабатывать реальные
            деньги
          </p>
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          <InputField
            name="phone"
            label="Номер телефона"
            icon={
              <FiPhone
                className={`register-icon ${errors.phone ? "error" : ""}`}
              />
            }
            errors={errors.phone}
            value={formData.phone}
            handleChange={handleChange}
            type={"text"}
            placeholder="Введите номер телефона"
          />
          <InputField
            name="password"
            label="Пароль"
            icon={
              <LuLock
                className={`register-icon ${errors.password ? "error" : ""}`}
              />
            }
            errors={errors.password}
            value={formData.password || ""}
            handleChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Введите пароль"
            setShowPassword={setShowPassword}
            passwordIkcon={showPasswordIcon(
              showPassword,
              errors.confirmPassword
            )}
          />
          <InputField
            name="confirmPassword"
            icon={
              <LuLock
                className={`register-icon ${
                  errors.confirmPassword ? "error" : ""
                }`}
              />
            }
            errors={errors.confirmPassword}
            value={formData.confirmPassword || ""}
            handleChange={handleChange}
            type={showRepeatPassword ? "text" : "password"}
            placeholder="Повторите пароль"
            setShowPassword={setShowRepeatPassword}
            passwordIkcon={showPasswordIcon(
              showRepeatPassword,
              errors.confirmPassword
            )}
          />
          <MainButton
            type="submit"
            disabled={!isFilled}
            className={isFilled ? "button active" : "button"}
            text="Получить код"
          />
        </form>
        <div className="register-footer">
          <p className="register-link-acc">Уже есть аккаунт</p>
          <p className="register-agree-desc">
            Нажимая на кнопку, вы даете согласие на обработку своих{" "}
            <span>персональных данных</span>
          </p>
        </div>
      </div>
    </div>
  );
}
