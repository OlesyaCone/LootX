import axios from "axios";
import type { Register, User} from "../types/interface";

axios.defaults.baseURL = "http://localhost:8000";

export async function registerUser(userData: Register): Promise<void> {
  try {
    const response = await axios.post("/auth/registration", userData);
    console.log("Успешная регистрация:", response.data);
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
  }
}

export async function verifyUser(token: string): Promise<void> {
  try {
    const response = await axios.get(`/auth/verify-email/${token}`);
    console.log("Успешно:", response.data);
  } catch (error) {
    console.error("Ошибка при верификации:", error);
    throw error;
  }
}

export async function entranceUser(user: User) {
  try {
    const response = await axios.post("/auth", user);

    console.log("Ответ сервера на /auth:", response); 

    const accessToken = response.headers["x-new-access-token"];
    const refreshToken = response.headers["x-new-refresh-token"];

    if (!accessToken || !refreshToken) {
      throw new Error("Токены отсутствуют в заголовках ответа");
    }

    localStorage.setItem("token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);

    console.log("Успешно:", { accessToken, refreshToken }); 
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.warn("Необходимо обновление токенов");

      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        throw new Error("Refresh token отсутствует");
      }

      try {
        const refreshResponse = await axios.get("/auth/refresh", {
          headers: { "Refresh-Token": refreshToken },
        });

        const newAccessToken = refreshResponse.headers["x-new-access-token"];
        const newRefreshToken = refreshResponse.headers["x-new-refresh-token"];

        if (!newAccessToken || !newRefreshToken) {
          throw new Error("Новые токены отсутствуют в заголовках ответа");
        }

        localStorage.setItem("token", newAccessToken);
        localStorage.setItem("refresh_token", newRefreshToken);

        console.log("Токены обновлены:", { newAccessToken, newRefreshToken });
      } catch (refreshError) {
        console.error("Ошибка при обновлении токенов:", refreshError);
        throw refreshError;
      }
    } else {
      console.error("Ошибка при входе пользователя:", error);
      throw new Error("Ошибка при входе пользователя");
    }
  }
}