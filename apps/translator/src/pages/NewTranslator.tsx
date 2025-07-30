import { useState } from "react";
import { ControlledCheckboxGroup } from "../components/registration_translator/CheckboxGroup";
import "../assets/style/newTranslator.css";
import { LanguageToggleButtons } from "../components/registration_translator/LanguageToggleButtons";
import AvatarUpload from "../components/registration_translator/AvatarUpload";
import { useNavigate } from "react-router-dom";
import { CHECKBOX_GROUPS, INPUT_FIELDS_CONFIG } from "../constans/constans";
import SucessActionModal from "@shared/components/SucessActionModal";
import { ControlledInputField } from "../components/registration_translator/ControlledInputField";
import { FormProvider, useForm } from "react-hook-form";
import { rules } from "../utils/rules";
import { auth } from "../utils/auth";
import type { UserProfileExtra } from "../types/types";

export default function NewTrasnlator() {
  const methods = useForm<UserProfileExtra>({
    mode: "onChange",
  });

  const { control, handleSubmit, formState } = methods;
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log("Отправка данных:", data);
    document.body.style.overflow = "hidden";
    auth.setProfileFilled();
    setSuccess(true);
    // fetch('/api/register', { method: 'POST', body: formData });

    localStorage.setItem("newTranslator", JSON.stringify(data));
  };

  const successSubmit = () => {
    setSuccess(false);
    document.body.style.overflow = "scroll";
    navigate("/my-home-translator-page");
  };

  return (
    <div className="container">
      <h2 className="new-traslator-title">Заполните свой профайл</h2>
      <FormProvider {...methods}>
        <form className="new-traslator-form" onSubmit={handleSubmit(onSubmit)}>
          <AvatarUpload
            onChange={(file) => methods.setValue("profilePhoto", file)}
          />
          {INPUT_FIELDS_CONFIG.map(
            ({ name, label, placeholder, icon, format, type }) => (
              <ControlledInputField
                key={name}
                name={name}
                control={control}
                label={label}
                placeholder={placeholder}
                icon={icon}
                format={format}
                type={type}
                rules={rules[name]}
              />
            )
          )}
          {CHECKBOX_GROUPS.map((group) => {
            const Component = group.useButtons
              ? LanguageToggleButtons
              : ControlledCheckboxGroup;
            return (
              <Component
                name={group.field}
                key={group.field}
                label={group.label}
                options={group.options}
                rules={rules[group.field]}
              />
            );
          })}
          <button
            type="submit"
            disabled={!formState.isValid}
            className={`button ${formState.isValid ? "active" : ""}`}
          >
            Зарегистрироваться
          </button>
        </form>
      </FormProvider>
      <p className="new-traslator-text">
        Нажимая на кнопку, вы даете согласие на обработку своих персональных
        данных
      </p>
      {success && (
        <SucessActionModal
          onClick={successSubmit}
          bgImg="/assets/images/successRegistr.png"
          header="Мы отправили смс с ссылкой для записи на собеседование"
          text="Если вы не получили, то звоните 010 2530 8575"
          btn="Здорово!"
          className="button active"
        />
      )}
    </div>
  );
}
