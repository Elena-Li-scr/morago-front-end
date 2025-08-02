import { Controller, useFormContext } from "react-hook-form";
type Option = {
  id: number;
  label: string;
};

type Props = {
  label: string;
  name: string;
  options: Option[];
  rules?: any;
};

export const LanguageToggleButtons = ({
  name,
  label,
  options,
  rules,
}: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value = [], onChange }, fieldState: { error } }) => {
        const toggle = (lang: number) => {
          const updated = value.includes(lang)
            ? value.filter((l: number) => l !== lang)
            : [...value, lang];
          onChange(updated);
        };
        return (
          <div className="tranalator-checkbox">
            <h4 className="tranalator-checkbox-title">{label}</h4>
            <div className="tranalator-checkbox-buttons">
              {options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`checkbox-button ${
                    value.includes(option.id) ? "active" : ""
                  }`}
                  onClick={() => toggle(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {error && <p className="register-validate">{error.message}</p>}
          </div>
        );
      }}
    />
  );
};
