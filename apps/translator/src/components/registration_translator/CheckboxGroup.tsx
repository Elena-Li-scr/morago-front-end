import { useController, useFormContext } from "react-hook-form";

type Option = {
  id: number;
  name: string;
};

type Props = {
  name: string;
  label: string;
  options: Option[];
  rules?: any;
  single?: boolean;
};

export const ControlledCheckboxGroup = ({ name, label, options, rules }: Props) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ name, control, rules });

  const handleChange = (option: number) => {
    const newValue = value?.includes(option)
      ? value.filter((v: number) => v !== option)
      : [...(value || []), option];
    console.log(newValue);

    onChange(newValue);
  };
  return (
    <div className="tranalator-checkbox">
      <p className="tranalator-checkbox-title">{label}</p>
      <div className="tranalator-checkbox-block">
        {options.map((option) => (
          <label key={option.id}>
            <input
              type="checkbox"
              checked={Array.isArray(value) && value.includes(option.id)}
              onChange={() => handleChange(option.id)}
              className="checkbox"
            />
            <span className="tranalator-option">{option.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
