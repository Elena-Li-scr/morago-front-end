import { Controller, useFormContext } from "react-hook-form";
type Props = {
  label: string;
  name: string;
  options: string[];
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
        const toggle = (lang: string) => {
          const updated = value.includes(lang)
            ? value.filter((l: string) => l !== lang)
            : [...value, lang];
          onChange(updated);
        };
        return (
          <div className="tranalator-checkbox">
            <h4 className="tranalator-checkbox-title">{label}</h4>
            <div className="tranalator-checkbox-buttons">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`checkbox-button ${
                    value.includes(option) ? "active" : ""
                  }`}
                  onClick={() => toggle(option)}
                >
                  {option}
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
