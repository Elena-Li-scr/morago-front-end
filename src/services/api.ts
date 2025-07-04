import axios from "axios";

interface NewUserRequest {
  request: {
    user: {
      phone: string;
      password: string;
    };
  };
}

export function newUser({ request }: NewUserRequest) {
  return axios.post("https://...", request);
}
