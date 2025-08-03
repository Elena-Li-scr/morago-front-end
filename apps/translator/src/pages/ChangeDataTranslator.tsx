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
import { newTranslatorData } from "../api/services/services";

export default function ChangeDataTranslator() {
  const methods = useForm<UserProfileExtra>({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const userDataString = auth.isNewTranslator();
  const userData = userDataString ? JSON.parse(userDataString) : {};
  const translator = useTranslatorFromLocalStorage();

  const { control, handleSubmit, formState } = methods;
  const onSubmit = async (data: any) => {
    const updatedUserData = {
      firstName: data.firstName,
      lastName: data.lastName,
      imageUrl: data.imageUrl || translator?.imageUrl,
    };

    try {
      await newTranslatorData(updatedUserData);
      auth.setNewTranslator(updatedUserData);
      navigate("/my-profile-page");
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
          <form
            className="new-traslator-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <AvatarUpload
              translatorAvatar={translator?.imageUrl}
              onChange={(file) => methods.setValue("imageUrl", file)}
            />
            {CHANGE_DATA_INPUTS.map(
              ({ name, key, label, placeholder, icon, format, type }) => (
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
              )
            )}
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
