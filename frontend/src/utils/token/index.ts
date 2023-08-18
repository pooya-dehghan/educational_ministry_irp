// tokenUtils.ts

export function setToken(token: string) {
  localStorage.setItem('token', token);
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function setRefreshToken(token: string) {
  localStorage.setItem('refresh-token', token);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('refresh-token');
}

export function removeRefreshToken() {
  localStorage.removeItem('refresh-token');
}
