import { API_URL, getHeaders } from "./ApiConfig";

class Api {
  constructor() {
    this._baseUrl = API_URL;
  }

  async getUserInfo() {
    try {
      const response = await fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: getHeaders(),
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      throw error;
    }
  }

  async addNewUserInfo(name, job) {
    try {
      const response = await fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({
          name: name,
          about: job,
        }),
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      throw error;
    }
  }

  async addNewUserInfoAvatar(link) {
    try {
      const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({
          avatar: link,
        }),
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao atualizar avatar:", error);
      throw error;
    }
  }

  async getAllCards() {
    try {
      const response = await fetch(`${this._baseUrl}/cards`, {
        method: "GET",
        headers: getHeaders(),
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao carregar cards:", error);
      throw error;
    }
  }

  async addNewCard(placeName, link) {
    try {
      const response = await fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          placeName,
          link,
        }),
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao criar um novo card:", error);
      throw error;
    }
  }

  async deleteCard(cardId) {
    try {
      const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao excluir card:", error);
      throw error;
    }
  }

  async addLike(cardId) {
    try {
      const response = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: getHeaders(),
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao adicionar curtida:", error);
      throw error;
    }
  }

  async removeLike(cardId) {
    try {
      const response = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao remover curtida:", error);
      throw error;
    }
  }
}

const apiInstance = new Api();

export default apiInstance;
