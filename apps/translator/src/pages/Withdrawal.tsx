import SucessActionModal from "@shared/components/SucessActionModal";
import { useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/registration_translator/InputField";
import { withdrawalData } from "../constans/constans";
import { GoShieldCheck } from "react-icons/go";
import { GrHomeRounded } from "react-icons/gr";
import { BiWalletAlt } from "react-icons/bi";
import "../assets/style/withdrawal.css";
import MainButton from "@shared/components/MainButton";
import { handleInput } from "../utils/inputValidate";

export default function Withdrawal() {
  const [form, setForm] = useState(withdrawalData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const isFilled =
    form.bankAccount &&
    form.bankName &&
    form.balance &&
    !errors.bankAccount &&
    !errors.bankName &&
    !errors.balance;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    handleInput(form, e.target, setForm, setErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };
  const successSubmit = () => {
    navigate("/my-home-translator-page");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="verification">
        <button
          type="button"
          onClick={() => navigate("/my-balance-translator-page")}
          className="back-button"
        >
          <MdKeyboardBackspace className="back-icon" />
        </button>
        <h2 className="verification-title" style={{ fontSize: "30px" }}>
          Вывод средств
        </h2>
        <p className="verification-text">
          Минимальная сумма вывода 50.000 вон. Введите номер своего счёта и в
          течении рабочего дня вам поступят средства.
        </p>
        <div className="withdrawal-inputs">
          <InputField
            name="bankAccount"
            label="Номер банковского счёта"
            placeholder="Номер банковского счёта"
            value={form.bankAccount}
            icon={<GoShieldCheck className={`register-icon`} />}
            handleChange={handleChange}
            errors={errors.bankAccount}
          />
          <InputField
            name="bankName"
            label="Название банка"
            placeholder="Выберите банк"
            value={form.bankName}
            icon={<GrHomeRounded className={`register-icon`} />}
            handleChange={handleChange}
          />
          <InputField
            name="balance"
            label="Сумма для вывода"
            placeholder="Сумма для вывода"
            value={form.balance}
            icon={<BiWalletAlt className={`register-icon`} />}
            handleChange={handleChange}
            errors={errors.balance}
          />
        </div>
        <MainButton
          type="submit"
          disabled={!isFilled}
          className={isFilled ? "button active" : "button"}
          text="Вывести"
        />
        <p className="withdrawal-support">Поддержка</p>
      </form>
      {success && (
        <SucessActionModal
          onClick={successSubmit}
          bgImg="/assets/home/up-balance.png"
          header="Вывод средств прошел успешно"
          text="Денежные средства поступят на Ваш счёт в течении одного рабочего дня"
          btn="Здорово!"
          className="button active"
        />
      )}
    </div>
  );
}
