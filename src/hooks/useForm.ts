import { useState } from 'react';
import type { ZodTypeAny } from 'zod';


export const useForm = <T extends Record<string, any>>(schema: ZodTypeAny, initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const setValue = (field: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
  const result = schema.safeParse(values);
  if (result.success) {
    setErrors({});
    return true;
  }
  const newErrors: Partial<Record<keyof T, string>> = {};
  result.error.issues.forEach((issue) => {
    const field = issue.path[0] as keyof T;
    if (!newErrors[field]) {
      newErrors[field] = issue.message;
    }
  });
  setErrors(newErrors);
  return false;
};

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, setValue, validate, reset };
};