import axios from "axios";

const API = axios.create({
  baseURL: "https://employee-freestyle-error.ngrok-free.dev"
});

export const askAI = (data) => {
  return API.post("/ask", data);
};
