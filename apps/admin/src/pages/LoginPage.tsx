import { useForm } from "react-hook-form";
import { useState } from "react";
import BigButton from "../components/BigButton";
import "../assets/style/startPage.css";
import { useNavigate } from "react-router-dom";
import { LoginAdmin } from "../api/services/services";
import axios from "axios";

interface FormData {
  phone: string;
  password: string;
}
export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>({ mode: "onChange" });
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    const admin = {
      password: data.password,
      phone: data.phone.replace(/\s+/g, ""),
    };
    localStorage.removeItem("token");
    localStorage.removeItem("phone");
    try {
      const response = await LoginAdmin(admin);
      if (response?.token && response?.phone) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("phone", response.phone);
        navigate("/home");
        setError(null);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error;
        if (errorMessage === "Invalid phone or password") {
          setError("Invalid phone or password");
        } else {
          setError("Login failed");
        }
      } else {
        setError("Login failed");
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
