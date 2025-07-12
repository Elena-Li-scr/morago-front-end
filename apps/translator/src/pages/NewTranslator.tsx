import React, { useEffect, useState } from "react";
import {
  defaultExtraData,
  type FormErrors,
  type UserProfileExtra,
} from "../types/types";
import { InputField } from "../components/registration_translator/InputField";
import { CheckboxGroup } from "../components/registration_translator/CheckboxGroup";
import { FileUpload } from "../components/registration_translator/FileUpload";
import "../assets/style/newTranslator.css";
import { ButtonCheckboxGroup } from "../components/registration_translator/ButtonCheckboxGroup";
import AvatarUpload from "../components/registration_translator/AvatarUpload";
import {
  formatKoreanPhone,
  formatTopikLevel,
  validatePhone,
} from "../utils/inputValidate";
import { useNavigate } from "react-router-dom";
import { CHECKBOX_GROUPS, INPUT_FIELDS_CONFIG } from "../constans/constans";
import SucessActionModal from "@shared/components/SucessActionModal";

export default function NewTrasnlator() {
  const [user, setUser] = useState(defaultExtraData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isValid =
      !!user.fullName?.trim() &&
      !!user.phone?.trim() &&
      !!user.birthDate?.trim() &&
      !!user.topikLevel?.trim() &&
      user.topikPhoto !== null &&
      user.translationTopics.length > 0 &&
      user.availableLanguages.length > 0;
    setIsFormValid(isValid);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const formatted = formatKoreanPhone(value);
      setUser((prev) => ({ ...prev, phone: formatted }));
      validatePhone(formatted, setErrors);
      return;
    }
    setUser((prev) => ({
      ...prev,
      [name]: name === "topikLevel" ? formatTopikLevel(value) : value,
    }));
  };

  const toggleItem = (field: keyof UserProfileExtra, value: string) => {
    setUser((prev) => {
      const current = prev[field] as string[];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    document.body.style.overflow = "hidden";
    console.log(user);
    setSuccess(true);
  };

  const successSubmit = () => {
    setSuccess(false);
    document.body.style.overflow = "scroll";
    navigate("/");
  };

  return (
    <div className="container">
      <h2 className="newTraslator-title">Заполните свой профайл</h2>
      <form className="newTraslator-form" onSubmit={handleSubmit}>
        <AvatarUpload
          onChange={(file) =>
            setUser((prev) => ({ ...prev, profilePhoto: file }))
          }
        />
        {INPUT_FIELDS_CONFIG.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={user[field.name]}
            placeholder={field.placeholder}
            icon={field.icon}
            errors={errors[field.name]}
            handleChange={handleInputChange}
          />
        ))}

        <FileUpload
          label="Загрузите фото ТОПИКА"
          onChange={(file) =>
            setUser((prev) => ({ ...prev, topikPhoto: file }))
          }
        />

        {CHECKBOX_GROUPS.map((group) => {
          const Component = group.useButtons
            ? ButtonCheckboxGroup
            : CheckboxGroup;
          return (
            <Component
              key={group.field}
              label={group.label}
              options={group.options}
              selected={
                Array.isArray(user[group.field])
                  ? (user[group.field] as string[])
                  : []
              }
              onToggle={(val) => toggleItem(group.field, val)}
            />
          );
        })}

        <button
          type="submit"
          disabled={!isFormValid}
          className={`button ${isFormValid ? "active" : ""}`}
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="newTraslator-text">
        Нажимая на кнопку, вы даете согласие на обработку своих персональных
        данных
      </p>
      {success && (
        <SucessActionModal
          onClick={successSubmit}
          bgImg="/images/successRegistr.png"
          header="Мы отправили смс с ссылкой для записи на собеседование"
          text="Если вы не получили, то звоните 010 2530 8575"
          btn="Здорово!"
          className="button active"
        />
      )}
    </div>
  );
}
