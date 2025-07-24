import "@shared/styles/profile.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MainButton from "@shared/components/MainButton";
import BackButton from "@shared/components/BackButton";

interface FormData {
  lastName: string;
  firstName: string;
  image: FileList;
}

export default function ChangeProfile() {
  const { register, handleSubmit } = useForm<FormData>({ mode: "onChange" });

  const [fileName, setFileName] = useState<string>("");
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="change-profile-wrapper">
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
              {...register("lastName", { required: true })}
            />
          </div>
          <label className="input-label">Имя</label>
          <div className="input-wrapper">
            <img src="/assets/home/profile.png" alt="first-name" />
            <input
              type="text"
              placeholder="Введите Ваше имя"
              className="main-input"
              {...register("firstName", { required: true })}
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
              {...register("image")}
              className="hidden-file-input"
              onChange={handleFileChange}
            />
            {fileName && <p className="selected-file-name">Выбран файл: {fileName}</p>}
          </div>
        </div>
        <MainButton text="Сохранить изменения" type="submit" className="button button-active" />
      </form>
    </div>
  );
}
