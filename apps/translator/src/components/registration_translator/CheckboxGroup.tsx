type CheckboxGroupProps = {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
};

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  selected,
  onToggle,
}) => {
  const itSpecialInputField = label === "Темы с сертификатом";

  return (
    <div className="tranalator-checkbox">
      {itSpecialInputField && <div className="tranalator-checkbox-line"></div>}
      <h4 className="tranalator-checkbox-title ">{label}</h4>
      <div className="tranalator-checkbox-block ">
        {options.map((option) => (
          <label
            key={option}
            className={` ${itSpecialInputField && `tranalator-checkbox-input`}`}
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
              className="checkbox"
            />
            <span
              className={`checkmark ${itSpecialInputField && "special"}`}
            ></span>
            <span className="tranalator-option">{option}</span>
            {itSpecialInputField && (
              <img
                className="iconPaperClip"
                src="/icons/paperclip-2.svg"
                alt=""
              />
            )}
          </label>
        ))}
      </div>
      {itSpecialInputField && <div className="tranalator-checkbox-line"></div>}
    </div>
  );
};
