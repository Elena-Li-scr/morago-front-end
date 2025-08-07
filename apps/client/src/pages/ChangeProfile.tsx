import "@shared/styles/profile.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MainButton from "@shared/components/MainButton";
import BackButton from "@shared/components/BackButton";
import SucessActionModal from "@shared/components/SucessActionModal";
import { updateAvatar } from "@shared/services/clientApi";
import { updateName } from "@shared/services/clientApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormData {
  lastName?: string;
  firstName?: string;
  image?: FileList;
}

export default function ChangeProfile() {
  const { register, handleSubmit, setValue } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      lastName: localStorage.getItem("lastName") || "",
      firstName: localStorage.getItem("firstName") || "",
    },
  });
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const [fileName, setFileName] = useState<string>("");
  const onSubmit = async (data: FormData) => {
    console.log("Форма:", data);
    const payload = {
      lastName: data.lastName || localStorage.getItem("lastName") || "",
      firstName: data.firstName || localStorage.getItem("firstName") || "",
    };
    try {
      let isSuccess;
      if (data.image?.[0]) {
        const formData = new FormData();
        formData.append("file", data.image[0]);
        const imageRes = await updateAvatar(formData);
        if (imageRes.status === 200 || imageRes.status === 204) {
          isSuccess = true;
        }
      }

      const res = await updateName(payload);
      console.log(res);
      if (res.status === 200 || res.status === 204) {
        localStorage.setItem("lastName", res.data.lastName);
        localStorage.setItem("firstName", res.data.firstName);
        isSuccess = true;
      }

      if (isSuccess) {
        setSuccess(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error;
        setServerError(errorMessage || "Произошла ошибка. Попробуйте снова.");
      } else {
        setServerError("Что-то пошло не так. Попробуйте снова.");
      }
    }
  };

  const successHandler = () => {
    navigate("/profile");
  };

  return (
    <div className="page-wrapper change-profile-wrapper">
      <div className="change-profile-header">
        <BackButton icon="/assets/arrow-left.png" />
        <h3>Изменить профиль</h3>
      </div>
      <form className="change-profile-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="input-label">Фамилия</label>
          <div className="input-wrapper">
            <img src="/assets/home/profile.png" alt="last-name" />
            <input
              type="text"
              placeholder="Введите Вашу фамилию"
              className="main-input"
              {...register("lastName")}
            />
          </div>
          <label className="input-label">Имя</label>
          <div className="input-wrapper">
            <img src="/assets/home/profile.png" alt="first-name" />
            <input
              type="text"
              placeholder="Введите Ваше имя"
              className="main-input"
              {...register("firstName")}
            />
          </div>
          <div className="file-upload-wrapper">
            <p className="input-label">Аватар</p>
            <label htmlFor="avatar-upload" className="custom-file-upload">
              Выбрать и загрузить новый
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden-file-input"
              onChange={(e) => {
                if (e.target.files?.length) {
                  setFileName(e.target.files[0].name);
                  setValue("image", e.target.files, { shouldValidate: true });
                }
              }}
            />
            {fileName && <p className="selected-file-name">Выбран файл: {fileName}</p>}
          </div>
        </div>
        {serverError && <p className="errors">{serverError}</p>}
        <MainButton text="Сохранить изменения" type="submit" className="button button-active" />
      </form>
      {success && (
        <SucessActionModal
          header="Изменения прошли успешно"
          btn="Здорово!"
          bgImg="/assets/signIcons/success-note.png"
          className="button button-active"
          onClick={successHandler}
        />
      )}
    </div>
  );
}
