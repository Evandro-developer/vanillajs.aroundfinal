const isProduction = process.env.NODE_ENV === "production";

export const API_URL = isProduction
  ? "https://api.aroundfinal.com.br"
  : "http://localhost:3001";

export const getHeaders = () => ({
  authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json; charset=UTF-8",
});
