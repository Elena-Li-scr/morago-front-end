import { useRef, useState } from "react";
import { postAdminFiles } from "../api/services/services";

const DEFAULT_AVATAR_URL = "/assets/Icon_mock_theme.png";
const BASE_URL = "http://localhost:8080";

type AvatarUploadProps = {
  translatorAvatar?: string | null;
};

const FileUpload = ({ translatorAvatar }: AvatarUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
      };
      reader.readAsDataURL(file);
      const img = await postAdminFiles(file);
      console.log(img);
    }
  };

  return (
    <div className="file-upload">
      <div className="file-upload-block">
        <img
          src={
            preview || (translatorAvatar ? `${BASE_URL}${translatorAvatar}` : DEFAULT_AVATAR_URL)
          }
          alt="avatar"
          className={`file-photo`}
        />
        <button type="button" onClick={handleClick} className="icon-camera-btn"></button>
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

export default FileUpload;
