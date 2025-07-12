import axios from "axios";

interface NewUserPayload {
  user: {
    phone: string;
    password: string;
  };
}

export function newUser(payload: NewUserPayload) {
  return axios.post("https://...", payload);
}
