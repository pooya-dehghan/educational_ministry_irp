export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    // Other user data
  };
}

export interface VerifyRequest {
  token: string | null;
}
