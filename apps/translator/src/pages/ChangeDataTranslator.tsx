import { FormProvider, useForm } from "react-hook-form";
import ChangePageBtn from "../components/buttons/ChangePageBtn";
import type { UserProfileExtra } from "../types/types";
import { CHANGE_DATA_INPUTS } from "../constans/constans";
import { ControlledInputField } from "../components/registration_translator/ControlledInputField";
import { rules } from "../utils/rules";
import AvatarUpload from "../components/registration_translator/AvatarUpload";
import { useTranslatorFromLocalStorage } from "../components/hooks/useTranslatorFromLocalStorage";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/auth";
import { imgTranslatorData, newTranslatorData } from "../api/services/services";
import { useEffect } from "react";

const DEFAULT_AVATAR_URL = "/assets/images/user.png";

export default function ChangeDataTranslator() {
  const translator = useTranslatorFromLocalStorage();
  const methods = useForm<UserProfileExtra>({
    mode: "onChange",
    defaultValues: {
      firstName: translator?.firstName ?? "",
      lastName: translator?.lastName ?? "",
    },
  });
  useEffect(() => {
    if (translator) {
      methods.reset({
        firstName: translator.firstName,
        lastName: translator.lastName,
        phone: translator.phone,
      });
    }
  }, [translator, methods]);
  const navigate = useNavigate();

  const { control, handleSubmit, formState } = methods;

  const onSubmit = async (data: any) => {
    let imageUrl: string | null = translator?.imageUrl ?? null;
    try {
      if (data.imageUrl && data.imageUrl !== translator?.imageUrl) {
        const response = await imgTranslatorData(data.imageUrl);
        imageUrl = `/uploads/${response.path}`;
      }
      if (!imageUrl) {
        imageUrl = DEFAULT_AVATAR_URL;
      }
      if (translator) {
        const res = await newTranslatorData(translator);
        const updatedUserData = {
          firstName: res.firstName,
          lastName: res.lastName,
          imageUrl: imageUrl,
          phone: res.phone,
          levelOfKorean: res?.levelOfKorean,
          dateOfBirth: res?.dateOfBirth?.replace(/\./g, "-"),
          themeIds: res.themes.map((t: any) => t.id ?? t),
          languageIds: res.languages.map((l: any) => l.id ?? l),
        };
        auth.setNewTranslator(updatedUserData);
        navigate("/my-profile-page");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="verification change-password">
        <div className="change-password-header">
          <ChangePageBtn page="changePasswordIkconBack" />
          <h2 className="change-password-title">Изменить профиль</h2>
        </div>
        <FormProvider {...methods}>
          <form className="new-traslator-form" onSubmit={handleSubmit(onSubmit)}>
            <AvatarUpload
              translatorAvatar={translator?.imageUrl}
              onChange={(file) => methods.setValue("imageUrl", file)}
            />
            {CHANGE_DATA_INPUTS.map(({ name, key, label, placeholder, icon, format, type }) => (
              <ControlledInputField
                key={key}
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
            <button
              type="submit"
              disabled={!formState.isValid}
              className={`button ${formState.isValid ? "active" : ""}`}
            >
              Сохранить изменения
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
