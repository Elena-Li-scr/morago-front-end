type ButtonCheckboxGroupProps = {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
};

export const ButtonCheckboxGroup: React.FC<ButtonCheckboxGroupProps> = ({
  label,
  options,
  selected,
  onToggle,
}) => {
  return (
    <div className="tranalator-checkbox">
      <h4 className="tranalator-checkbox-title">{label}</h4>
      <div className="tranalator-checkbox-buttons">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`checkbox-button ${isSelected ? "active" : ""}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};
