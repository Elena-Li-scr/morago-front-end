import { IoEyeOutline } from "react-icons/io5";
import { usePopUp } from "./usePopUp";
import { useParams } from "react-router-dom";

export const TestCallButton = (data: any) => {
  const { setPopUpData } = usePopUp();

  const { type } = useParams();

  const eyeBtn = (row: any) => {
    let typePage: "user" | "translator" | "themes" | "categories" | null = null;
    if (type === "translator") typePage = "translator";
    else if (type === "user") typePage = "user";
    else if (type === "themes") typePage = "themes";
    else if (type === "categories") typePage = "categories";
    if (typePage) {
      setPopUpData({ type: typePage, id: row.row.id });
    }
  };
  return (
    <button onClick={() => eyeBtn(data)}>
      <IoEyeOutline className="eye-icon" style={{ fontSize: "24px" }} />
    </button>
  );
};
