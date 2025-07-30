import { settingsSections } from "../constans/constans";
import { useNavigate } from "react-router-dom";
// import "../assets/style/register.css";

export default function Profile() {
  const navigate = useNavigate();

  const handleClick = (item: any) => {
    if (item.route) navigate(item.route, { relative: "path" });
    else if (item.action === "share") {
      // логика шаринга
      alert("Ссылка скопирована!");
    }
  };

  return (
    <div className="container">
      <div className="profile-setting">
        {settingsSections.map((section) => (
          <div key={section.title}>
            <h3 className="profile-setting-title">{section.title}</h3>
            {section.items.map((item) => (
              <div
                key={item.label}
                className="profile-setting-item profile-setting-input"
                onClick={() => handleClick(item)}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
