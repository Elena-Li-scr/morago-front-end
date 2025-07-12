import { useForm } from "react-hook-form";
import MainButton from "@shared/components/MainButton";
import SucessActionModal from "@shared/components/SucessActionModal";
import BackButton from "@shared/components/BackButton";

import "@shared/styles/balanceWithdraw.css";
import { useState } from "react";

interface FormData {
  fullName: string;
  amount: number;
}

export default function BalanceWithdraw() {
  const [isSuccess, setIsSuccess] = useState(false);

  const amounts = [10000, 30000, 50000, 100000];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Отправленные данные:", data);
    setIsSuccess(true);
  };

  const successAction = () => {
    setIsSuccess(false);
  };

  const selectedAmount = watch("amount");
  return (
    <div className="balance-withdraw-wrapper">
      <BackButton />
      <h2 className="balance-withdraw-header">Пополнить баланс</h2>
      <p className="balance-withdraw-text">
        Минимальная сумма пополнения 10.000 вон. Средства зачисляются на счёт в
        течении одного рабочего дня.
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
            {...register("fullName", { required: true })}
          />
        </div>
        {errors.fullName && (
          <p className="form-error">{errors.fullName.message}</p>
        )}
        <label>Сумма для пополнения</label>
        <div className="balance-withdraw-amounts">
          {amounts.map((amount) => (
            <button
              type="button"
              key={amount}
              className={selectedAmount === amount ? "selected-amount" : ""}
              onClick={() =>
                setValue("amount", amount, { shouldValidate: true })
              }
            >
              <div>
                <img
                  className="coin-image"
                  src="/assets/home/coin-icon.png"
                  alt="coin"
                />
                <span>{amount.toLocaleString("ru-RU")} вон</span>
              </div>
              {selectedAmount === amount && (
                <img src="/assets/home/tick.png" alt="tick" />
              )}
            </button>
          ))}
        </div>
        {errors.amount && <p>{errors.amount.message}</p>}
        <MainButton type="submit" text="Запросить пополнение" />
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
        />
      )}
    </div>
  );
}
