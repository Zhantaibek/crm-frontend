import { z } from 'zod'


export const loginSchema = z.object({
  email: z.string().min(1, 'Email обязателен').email('Введите корректный email'),
  password: z.string().min(1, 'Пароль обязателен'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Имя минимум 2 символа'),
  surname: z.string().optional(),
  email: z.string().min(1, 'Email обязателен').email('Введите корректный email'),
  password: z.string().min(6, 'Пароль минимум 6 символов'),
  password2: z.string().min(1, 'Подтвердите пароль'),
  agreed: z.boolean().refine((v) => v === true, 'Примите условия использования'),
}).refine((data) => data.password === data.password2, {
  message: 'Пароли не совпадают',
  path: ['password2'],
});

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Имя минимум 2 символа'),
  surname: z.string().optional(),
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль минимум 6 символов').optional().or(z.literal('')),
  password2: z.string().optional().or(z.literal('')),
}).refine((data) => {
  if (data.password && data.password !== data.password2) return false;
  return true;
}, {
  message: 'Пароли не совпадают',
  path: ['password2'],
});

export const createProductSchema = z.object({
  name: z.string().min(2, 'Название минимум 2 символа'),
  price: z.number().positive('Цена должна быть больше 0'),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type UpdateProfileForm = z.infer<typeof updateProfileSchema>;
export type CreateProductForm = z.infer<typeof createProductSchema>;