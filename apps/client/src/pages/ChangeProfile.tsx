import "@shared/styles/profile.css";
import BackButton from "@shared/components/BackButton";
import { useForm } from "react-hook-form";
import MainButton from "@shared/components/MainButton";

interface FormData {
  lastName: string;
  firstName: string;
}

export default function ChangeProfile() {
  const { register, handleSubmit } = useForm<FormData>({ mode: "onChange" });
  const onSubmit = (data: FormData) => {
    console.log(data);
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
        </div>
        <MainButton
          text="Сохранить изменения"
          type="submit"
          className="button button-active"
        />
      </form>
    </div>
  );
}
