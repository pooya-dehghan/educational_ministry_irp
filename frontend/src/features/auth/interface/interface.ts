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

export interface ChangePasswordRequest {
  username: string;
  old_password: string;
  new_password: string;
  new_password_confirm: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyRequest {
  token: string | null;
}
