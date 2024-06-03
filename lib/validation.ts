import * as z from 'zod';

// loginSchema
export const loginSchema = z.object({
  username: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(2, { message: 'Password must be at least 8 characters' })
    .max(50, { message: 'Password cannot exceed 50 characters' }),
});

export const loginSchemaCN = z.object({
  username: z.string().email({ message: '请输入有效的邮箱地址' }),
  password: z
    .string()
    .min(2, { message: '密码必须至少包含2个字符' })
    .max(50, { message: '密码不能超过50个字符' }),
});

// signUpSchema
export const signUpSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(50, { message: 'Password cannot exceed 50 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
});

export const signUpSchemaCN = z.object({
  password: z
    .string()
    .min(8, { message: '密码必须至少包含8个字符' })
    .max(50, { message: '密码不能超过50个字符' }),
  email: z.string().email({ message: '请输入有效的邮箱地址' }),
});

// resetSchema
export const resetSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(50, { message: 'Password cannot exceed 50 characters' }),
    confirm: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(50, { message: 'Password cannot exceed 50 characters' }),
    verification_code: z.string().min(6).max(6, {
      message: 'Verification code must be a 6-digit',
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

  export const resetSchemaCN = z
  .object({
    email: z.string().email({ message: '请输入有效的邮箱地址' }),
    password: z
      .string()
      .min(6, { message: '密码必须至少包含6个字符' })
      .max(50, { message: '密码不能超过50个字符' }),
    confirm: z
      .string()
      .min(6, { message: '密码必须至少包含6个字符' })
      .max(50, { message: '密码不能超过50个字符' }),
    verification_code: z.string().min(6).max(6, {
      message: '验证码必须是6位数字',
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

// resetEmail
export const resetEmail = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(2).max(50),
});

export const resetEmailCN = z.object({
  email: z.string().email({ message: '请输入有效的邮箱地址' }),
  password: z.string().min(2).max(50),
});


// resetPass
export const resetPass = z.object({
  new_password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(50, { message: 'Password cannot exceed 50 characters' }),
  old_password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(50, { message: 'Password cannot exceed 50 characters' }),
});

export const resetPassCN = z.object({
  new_password: z
    .string()
    .min(6, { message: '密码必须至少包含6个字符' })
    .max(50, { message: '密码不能超过50个字符' }),
  old_password: z
    .string()
    .min(6, { message: '密码必须至少包含6个字符' })
    .max(50, { message: '密码不能超过50个字符' }),
});

// resetName
export const resetName = z.object({
  firstname: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(50, { message: 'First name cannot exceed 50 characters' }),
  lastname: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(50, { message: 'Last name cannot exceed 50 characters' }),
});

export const resetNameCN = z.object({
  firstname: z
    .string()
    .min(2, { message: '名字必须至少包含2个字符' })
    .max(50, { message: '名字不能超过50个字符' }),
  lastname: z
    .string()
    .min(2, { message: '姓氏必须至少包含2个字符' })
    .max(50, { message: '姓氏不能超过50个字符' }),
});



// generateOutlineSchema 
export const generateOutlineSchema = z.object({
  area: z.string().min(1, { message: 'Area must be at least 1 character' }),
  idea: z
    .string()
    .min(1, { message: 'Description must be at least 1 character' }),
});

export const generateOutlineSchemaCN = z.object({
  area: z.string().min(1, { message: '领域必须至少包含1个字符' }),
  idea: z
    .string()
    .min(1, { message: '描述必须至少包含1个字符' }),
});