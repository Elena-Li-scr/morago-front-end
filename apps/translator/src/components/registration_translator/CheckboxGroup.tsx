import { useController, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  options: string[];
  rules?: any;
  single?: boolean;
};

export const ControlledCheckboxGroup = ({
  name,
  label,
  options,
  rules,
  single = false,
}: Props) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ name, control, rules });

  const handleChange = (option: string) => {
    if (single) {
      onChange(!value ? true : !value);
    } else {
      const newValue = value?.includes(option)
        ? value.filter((v: string) => v !== option)
        : [...(value || []), option];
      onChange(newValue);
    }
  };
  return (
    <div className="tranalator-checkbox">
      <p className="tranalator-checkbox-title">{label}</p>
      <div className="tranalator-checkbox-block">
        {options.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              checked={
                single
                  ? !!value
                  : Array.isArray(value) && value.includes(option)
              }
              onChange={() => handleChange(option)}
              className="checkbox"
            />
            <span className="tranalator-option">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
