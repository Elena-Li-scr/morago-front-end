import React, { useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
type AvatarUploadProps = {
  onChange: (file: File) => void;
};

const AvatarUpload: React.FC<AvatarUploadProps> = ({ onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="register-user">
      <div className="register-block">
        <img
          src={preview || "/images/user.png"}
          alt="avatar"
          className="register-user-photo"
        />
        <button type="button" onClick={handleClick} className="icon-camera-btn">
          <AiOutlineCamera className="icon-camera" />
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default AvatarUpload;
