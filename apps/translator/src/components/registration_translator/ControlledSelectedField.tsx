import { Controller, useFormContext } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type Props = {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  rules?: any;
  icon?: React.ReactNode;
};

export const ControlledSelectField = ({
  name,
  label,
  options,
  placeholder = "Выберите значение",
  rules,
  icon,
}: Props) => {
  const { control } = useFormContext();
  return (
    <div className="register-block">
      <label className="register-label" htmlFor={name}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="register-input">
              {icon && <span className="register-icon">{icon}</span>}
              <select
                id={name}
                {...field}
                className={`select-input input ${error ? "input-error" : ""}`}
              >
                <option value="">{placeholder}</option>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            {error && <p className="register-validate">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};
