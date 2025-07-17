import { useRef, useState } from "react";

type FileUploadProps = {
  label?: string;
  onChange: (file: File | null) => void;
};

export const FileUpload: React.FC<FileUploadProps> = ({ label, onChange }) => {
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
        setPreview(file.name);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="tranalator-fileupload register-input">
      <button type="button" onClick={handleClick}>
        <img
          className="iconPaper-Clip"
          src="/assets/icons/paperclip-2.svg"
          alt="clip"
        />
      </button>
      {preview ? (
        <label className="tranalator-fileupload-label input active ">
          1 файл
        </label>
      ) : (
        <label className="tranalator-fileupload-label input">{label}</label>
      )}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        placeholder="Загрузите фото ТОПИКА"
        onChange={handleFileChange}
      />
    </div>
  );
};
