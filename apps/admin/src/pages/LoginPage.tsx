import { useForm } from "react-hook-form";
import { useState } from "react";
import BigButton from "../components/BigButton";
import "../assets/style/startPage.css";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}
export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>({ mode: "onChange" });
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      // const res = await LoginAdmin(data);
      console.log(res);
      // if (data.email === "admin@gmail.com" && data.password === "admin") {
      //   navigate("/home");
      // } else {
      //   throw new Error("Incorrect password or Email");
      // }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };
  return (
    <div className="sign-page">
      <form className="start-page-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        <input
          type="number"
          placeholder="Email"
          className="sign-input"
          {...register("email", {
            required: true,
          })}
        />

        <input
          type="password"
          placeholder="Password"
          className="sign-input"
          {...register("password", { required: true })}
        />
        {error && <p className="form-error">{error}</p>}

        <BigButton text="Login" type="submit" />
        <button
          className="forgot-pass-button"
          type="button"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </button>
      </form>
    </div>
  );
}
