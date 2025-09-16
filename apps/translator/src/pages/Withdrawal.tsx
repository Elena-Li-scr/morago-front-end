import SucessActionModal from "@shared/components/SucessActionModal";
import { useState } from "react";
import { GoShieldCheck } from "react-icons/go";
import { GrHomeRounded } from "react-icons/gr";
import { BiWalletAlt } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import { ControlledInputField } from "../components/registration_translator/ControlledInputField";
import { koreanBankOptions, withdrawalData } from "../constans/constans";

import "../assets/style/withdrawal.css";
import MainButton from "@shared/components/MainButton";
import { FormProvider, useForm } from "react-hook-form";
import { rules } from "../utils/rules";
import { formatBalance, formatBankAccount } from "../utils/formatInput";
import { ControlledSelectField } from "../components/registration_translator/ControlledSelectedField";
import ChangePageBtn from "../components/buttons/ChangePageBtn";
import { postWithdrawalTranslator } from "@shared/services/translatorApi";
import type { WithdrawalForm } from "@shared/types/types";

export default function Withdrawal() {
  const methods = useForm({
    mode: "onChange",
    defaultValues: withdrawalData,
  });

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { control, handleSubmit, formState } = methods;

  const onSubmit = async (data: WithdrawalForm) => {
    const withdrawal = {
      accountHolder: data.accountHolder,
      nameOfBank: data.nameOfBank,
      won: data.won.replace(/\D/g, ""),
    };
    await postWithdrawalTranslator(withdrawal);
    setSuccess(true);
  };
  const successSubmit = () => {
    navigate("/my-home-translator-page");
  };

  return (
    <div className="container">
      <FormProvider {...methods}>
        <form className="verification" onSubmit={handleSubmit(onSubmit)}>
          <ChangePageBtn page="withdrawalIkconBack" />
          <h2 className="verification-title">Вывод средств</h2>
          <p className="verification-text">
            Минимальная сумма вывода 50.000 вон. Введите номер своего счёта и в течении рабочего дня
            вам поступят средства.
          </p>
          <div className="withdrawal-inputs">
            <ControlledInputField
              name="accountHolder"
              icon={<GoShieldCheck className={`register-icon`} />}
              control={control}
              label="Номер банковского счёта"
              placeholder="Номер банковского счёта"
              format={formatBankAccount}
              rules={rules.accountHolder}
            />
            <ControlledSelectField
              name="nameOfBank"
              icon={<GrHomeRounded className={`register-icon`} />}
              label="Название банка"
              placeholder="Выберите банк"
              rules={{ required: "Выберите банк" }}
              options={koreanBankOptions}
            />
            <ControlledInputField
              name="won"
              label="Сумма для вывода"
              placeholder="Сумма для вывода"
              icon={<BiWalletAlt className={`register-icon`} />}
              control={control}
              format={formatBalance}
              rules={rules.won}
            />
          </div>
          <MainButton
            type="submit"
            disabled={!formState.isValid}
            className={formState.isValid ? "button active" : "button"}
            text="Вывести"
          />
          <p className="withdrawal-support">Поддержка</p>
        </form>
      </FormProvider>
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
