import { useForm } from "react-hook-form";
import { useState } from "react";
import BigButton from "../components/BigButton";
import "../assets/style/startPage.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { register, handleSubmit } = useForm<RegisterAdmin>({ mode: "onChange" });
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: RegisterAdmin) => {
    const admin = {
      password: data.password,
      phone: data.phone.replace(/\s+/g, ""),
    };
    try {
      const response = await LoginAdmin(admin);
      console.log(response);
      if (response?.token && response?.phone) {
        localStorage.clear();
        localStorage.setItem("token", response.token);
        localStorage.setItem("phone", response.phone);
        navigate("/home");
        setError(null);
      }
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
          type="tel"
          placeholder="Phone"
          className="sign-input"
          {...register("phone", {
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
