import { AuthState } from "../context/AuthContext";
import { User } from "../types/Auth";
import { TOKEN_KEY, REFRESH_TOKEN_KEY, USER_STATE } from "./constants";

export function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function setRefreshToken(refreshToken: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function deleteRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function setState(state: User) {
    localStorage.setItem(USER_STATE, JSON.stringify(state));
}
export function getState() {
    var user = localStorage.getItem(USER_STATE);
    return JSON.parse(user!)
}

export function deleteState() {
    localStorage.removeItem(USER_STATE);
}