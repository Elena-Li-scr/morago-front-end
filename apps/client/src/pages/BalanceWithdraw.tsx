import { useForm } from "react-hook-form";
import { useEffect } from "react";
import MainButton from "@shared/components/MainButton";
import SucessActionModal from "@shared/components/SucessActionModal";
import BackButton from "@shared/components/BackButton";
import type { BalancePayload } from "@shared/types/types";
import { sendDeposit } from "@shared/services/clientApi";
// import axios from "axios";

import "@shared/styles/balanceWithdraw.css";
import { useState } from "react";

export default function BalanceWithdraw() {
  const [isSuccess, setIsSuccess] = useState(false);

  const amounts = [10000, 30000, 50000, 100000];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BalancePayload>({ mode: "onTouched" });

  const onSubmit = async (data: BalancePayload) => {
    const payload = {
      accountHolder: data.accountHolder,
      nameOfBank: "Hana",
      won: data.won,
    };
    try {
      const res = await sendDeposit(payload);
      if (res.status === 200 || res.status === 204) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error);
      // if (axios.isAxiosError(error)) {
      //   const errorMessage = error.response?.data?.error;
      //   setServerError(errorMessage || "Произошла ошибка. Попробуйте снова.");
      // } else {
      //   setServerError("Что-то пошло не так. Попробуйте снова.");
      // }
    }
  };

  const successAction = () => {
    setIsSuccess(false);
  };

  useEffect(() => {
    register("won", { required: "Выберите сумму пополнения" });
  }, [register]);

  const selectedAmount = watch("won");

  return (
    <div className="balance-withdraw-wrapper">
      <BackButton icon="/assets/arrow-left.png" />
      <h2 className="balance-withdraw-header">Пополнить баланс</h2>
      <p className="balance-withdraw-text">
        Минимальная сумма пополнения 10.000 вон. Средства зачисляются на счёт в течении одного
        рабочего дня.
      </p>
      <h3>Счёт для пополнения</h3>
      <div className="balance-withdraw-card">
        <span>1234 5678 9101 1234</span>
        <span className="balance-withdraw-copy">Copy</span>
        <span className="balance-withdraw-bank">KEB Hana Bank</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="balance-withdraw-form">
        <label>Имя отправителя</label>
        <div className="balance-withdraw-name">
          <img src="/assets/home/full-name.png" alt="full-name" />
          <input
            type="text"
            placeholder="Фамилия Имя"
            {...register("accountHolder", { required: "Укажите фамилию и имя отправителя" })}
          />
        </div>
        {errors.accountHolder && <p className="errors">{errors.accountHolder.message}</p>}
        <label>Сумма для пополнения</label>
        <div className="balance-withdraw-amounts">
          {amounts.map((amount) => (
            <button
              type="button"
              key={amount}
              className={selectedAmount === amount ? "selected-amount" : ""}
              onClick={() => setValue("won", amount, { shouldValidate: true })}
            >
              <div>
                <img className="coin-image" src="/assets/home/coin-icon.png" alt="coin" />
                <span>{amount.toLocaleString("ru-RU")} вон</span>
              </div>
              {selectedAmount === amount && <img src="/assets/home/tick.png" alt="tick" />}
            </button>
          ))}
        </div>
        {errors.won && <p className="errors">{errors.won.message}</p>}
        <MainButton type="submit" text="Запросить пополнение" className="button button-active" />
      </form>
      <button className="withdraw-support">Поддержка</button>
      {isSuccess && (
        <SucessActionModal
          header="Запрос на пополнение выполнен успешно"
          text="Денежные средства поступят на Ваш 
баланс в течении одного рабочего дня"
          bgImg="/assets/home/up-balance.png"
          btn="Здорово!"
          onClick={successAction}
          className="button button-active"
        />
      )}
    </div>
  );
}
