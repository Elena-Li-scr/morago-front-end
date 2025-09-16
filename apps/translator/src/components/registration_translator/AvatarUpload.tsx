import { useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const DEFAULT_AVATAR_URL = "/assets/images/user.png";
const BASE_URL = "http://localhost:8080";

type AvatarUploadProps = {
  onChange?: (file: File) => void;
  translatorAvatar?: File | string | null;
};

const AvatarUpload = ({ onChange, translatorAvatar }: AvatarUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const location = useLocation();
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
      };
      reader.readAsDataURL(file);
      onChange?.(file);
    }
  };

  const isMyProfile = location.pathname === "/my-profile-page";

  return (
    <div className="register-user">
      <div className="register-block">
        <img
          src={
            preview || (translatorAvatar ? `${BASE_URL}${translatorAvatar}` : DEFAULT_AVATAR_URL)
          }
          alt="avatar"
          className={isMyProfile ? `profile-img` : `register-user-photo`}
        />
        {!isMyProfile && (
          <button type="button" onClick={handleClick} className="icon-camera-btn">
            <AiOutlineCamera className="icon-camera" />
          </button>
        )}
      </div>
      {!isMyProfile && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      )}
    </div>
  );
};

export default AvatarUpload;
