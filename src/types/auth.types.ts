export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}