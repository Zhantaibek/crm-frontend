export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface UpdateMeDto {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
}