import { IoEyeOutline } from "react-icons/io5";
import { usePopUp } from "./usePopUp";
import {
  getCategoryById,
  getThemeById,
  getTranslatorById,
  getUserById,
} from "../../api/services/services";

export const TestCallButton = (data: any) => {
  const { setPopUpData } = usePopUp();

  const eyeBtn = async (row: any) => {
    try {
      const data =
        row.role === "user"
          ? await getUserById(row.id)
          : row.role === "translator"
            ? await getTranslatorById(row.id)
            : row.role === "themes"
              ? await getThemeById(row.id)
              : await getCategoryById(row.id);
      setPopUpData(data);
    } catch (e: any) {
      console.log(e?.response?.data ?? "Network error");
    }
    // document.body.style.overflow = "hidden";
  };
  return (
    <button onClick={() => eyeBtn(data)}>
      <IoEyeOutline className="eye-icon" style={{ fontSize: "24px" }} />
    </button>
  );
};
