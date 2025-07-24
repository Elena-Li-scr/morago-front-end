import { useForm } from "react-hook-form";
import BigButton from "../components/BigButton";
import "../assets/style/startPage.css";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
}
export default function ForgotPassword() {
  const { register, handleSubmit } = useForm<FormData>({ mode: "onChange" });
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log(data);
    navigate("/new-password");
  };
  return (
    <div className="sign-page">
      <form className="start-page-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Request pass</h2>

        <input
          type="email"
          placeholder="Email"
          className="sign-input"
          {...register("email", {
            required: true,
          })}
        />
        <BigButton text="Send link" type="submit" />
        <button className="forgot-back-button" type="button" onClick={() => navigate(-1)}>
          Back
        </button>
      </form>
    </div>
  );
}
