import { useForm } from "react-hook-form";
import BigButton from "../components/BigButton";
import "../assets/style/startPage.css";
import { useNavigate } from "react-router-dom";

interface FormData {
  password: string;
  repeatPassword: string;
}
export default function NewPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = (data: FormData) => {
    console.log(data);
    navigate("/home");
  };
  return (
    <div className="sign-page">
      <form className="start-page-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Password</h2>

        <input
          type="password"
          placeholder="Password"
          className="sign-input"
          {...register("password", {
            required: true,
          })}
        />
        <input
          type="password"
          placeholder="Repeat Password"
          className="sign-input"
          {...register("repeatPassword", {
            required: true,
            validate: (value) => value === password || "Passwords are not match",
          })}
        />

        {errors.repeatPassword && <p className="form-error">{errors.repeatPassword.message}</p>}
        <BigButton text="Save" type="submit" />
        <button className="forgot-back-button" type="button" onClick={() => navigate(-1)}>
          Back
        </button>
      </form>
    </div>
  );
}
