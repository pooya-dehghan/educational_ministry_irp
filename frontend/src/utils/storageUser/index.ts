interface UserInfo {
  type: string;
  username: string;
  id: number;
}

export function setUserInfo(userInfo: UserInfo) {
  localStorage.setItem('userinfo', JSON.stringify(userInfo));
}

export function getUserInfo(): UserInfo {
  const userInfo = localStorage.getItem('userinfo');
  return userInfo !== null ? JSON.parse(userInfo) : null;
}

export function removeUserInfo() {
  localStorage.removeItem('userinfo');
}
