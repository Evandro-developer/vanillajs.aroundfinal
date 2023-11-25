import { API_URL, getHeaders } from "./ApiConfig";
import { emailRegex, passwordRegex } from "../utils/globalValidationRules";

class Auth {
  constructor() {
    this.baseUrl = API_URL;
  }

  async _handleResponse(res) {
    const responseBody = await res.json();

    if (!res.ok) {
      const errorMessages = {
        "/signup": {
          400: "Um dos campos foi preenchido incorretamente",
        },
        "/signin": {
          400: "Um ou mais campos não foram fornecidos",
          401: "O usuário com o e-mail especificado não foi encontrado",
        },
        "/users/me": {
          400: "Token não fornecido ou fornecido em formato errado",
          401: "O token fornecido é inválido",
        },
        default: {
          200: "Requisição bem-sucedida",
          201: "Recurso criado com sucesso",
          400: "Requisição malformada",
          401: "Não autorizado",
          403: "Acesso proibido",
          404: "Recurso não encontrado",
          409: "Conflito",
          500: "Erro interno do servidor",
        },
      };

      const endpoint = res.url.slice(-res.url.lastIndexOf("/"));
      const errorMessage =
        errorMessages[endpoint]?.[res.status] ||
        errorMessages["default"][res.status] ||
        responseBody.message ||
        res.statusText;

      throw new Error(`${res.status} - ${errorMessage}`);
    }
    return responseBody;
  }

  // Validar e-mail e password no client side para garantir a integridade dos dados nas solicitações
  // Validate email and password on client side to ensure data integrity in requests
  _validateEmailAndPassword(email, password) {
    const EMAIL_PATTERN = emailRegex;
    const PASSWORD_PATTERN = passwordRegex;

    if (!email || !EMAIL_PATTERN.test(email)) {
      throw new Error("400 - Formato de e-mail inválido");
    }

    if (!password || !PASSWORD_PATTERN.test(password)) {
      throw new Error("400 - Formato de senha inválido");
    }
  }

  async register(email, password) {
    this._validateEmailAndPassword(email, password);

    const response = await fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    return this._handleResponse(response);
  }

  async authorize(email, password) {
    this._validateEmailAndPassword(email, password);

    const response = await fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    const data = await this._handleResponse(response);
    localStorage.setItem("token", data.token);
    localStorage.setItem("userEmail", email);
    return data;
  }

  async getContent() {
    const token = localStorage.getItem("token");

    // Verifica o token novamente no client side para garantir que o token existe
    // Check token again on client side to ensure the token exists
    if (!token) {
      throw new Error(
        "400 - Token não fornecido ou fornecido em formato errado"
      );
    }

    const response = await fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: getHeaders(),
    });

    const data = await this._handleResponse(response);
    return data;
  }
}

const authInstance = new Auth();

export default authInstance;
