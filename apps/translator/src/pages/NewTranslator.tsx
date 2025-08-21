import { ControlledCheckboxGroup } from "../components/registration_translator/CheckboxGroup";
import "../assets/style/newTranslator.css";
import { LanguageToggleButtons } from "../components/registration_translator/LanguageToggleButtons";
import AvatarUpload from "../components/registration_translator/AvatarUpload";
import { useNavigate, useParams } from "react-router-dom";
import { CHECKBOX_GROUPS, INPUT_FIELDS_CONFIG } from "../constans/constans";
import SucessActionModal from "@shared/components/SucessActionModal";
import { ControlledInputField } from "../components/registration_translator/ControlledInputField";
import { FormProvider, useForm } from "react-hook-form";
import { rules } from "../utils/rules";
import { auth } from "../utils/auth";
import type { UserProfileExtra } from "../types/types";
import { newTranslatorData } from "../api/services/services";
import { formatPhone } from "../utils/formatInput";
import { useModalStore } from "../components/loading/useModalStore";
import { useEffect } from "react";
export default function NewTrasnlator() {
  const { success, setSuccess } = useModalStore();
  useEffect(() => {
    if (success) setSuccess(false);
  }, []);

  const { phone } = useParams();
  const methods = useForm<UserProfileExtra>({
    mode: "onChange",
    defaultValues: {
      phone: formatPhone(phone || ""),
    },
  });
  const { control, handleSubmit, formState } = methods;
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const fullName = data.fullName.split(" ");
    const firstName = fullName[0];
    const lastName = fullName[fullName.length - 1];
    const translatorData = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: data.dateOfBirth.replace(/\./g, "-"),
      levelOfKorean: data.levelOfKorean,
      imageUrl: data.imageUrl,
      themeIds: data.themeIds,
      languageIds: data.languageIds,
    };
    try {
      await newTranslatorData(translatorData);
      document.body.style.overflow = "hidden";
      auth.setProfileFilled();
      auth.setNewTranslator(translatorData);
    } catch (err: any) {
      const serverMessage = err.response?.data.error;
      console.log(err);
    }
  };

  const successSubmit = () => {
    document.body.style.overflow = "scroll";
    setSuccess(false);
    navigate("/my-home-translator-page");
  };

  return (
    <div className="container">
      <h2 className="new-traslator-title">Заполните свой профайл</h2>
      <FormProvider {...methods}>
        <form className="new-traslator-form" onSubmit={handleSubmit(onSubmit)}>
          <AvatarUpload onChange={(file) => methods.setValue("imageUrl", file)} />
          {INPUT_FIELDS_CONFIG.map(({ name, label, placeholder, icon, format, type }) => (
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
          ))}
          {CHECKBOX_GROUPS.map((group) => {
            const Component = group.useButtons ? LanguageToggleButtons : ControlledCheckboxGroup;
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
        Нажимая на кнопку, вы даете согласие на обработку своих персональных данных
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
