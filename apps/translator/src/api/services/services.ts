import type { RegisterFormValues } from "../../types/types";
import axiosInstance from "../axios-config";

export const registerTranslator = async (data: RegisterFormValues) => {
  console.log(data);

  return axiosInstance.post("/auth/register", data).then((res) => res.data);
};
