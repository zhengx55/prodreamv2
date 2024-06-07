import * as z from 'zod';


export const createLoginSchema = (t: (id: string) => string) => z.object({
  username: z.string().email({ message: t('Schema.LoginSchema.Invalid_email_address') }),
  password: z
    .string()
    .min(8, { message: t('Schema.LoginSchema.Password_must_be_at_least_8_characters') })
    .max(50, { message: t('Schema.LoginSchema.Password_cannot_exceed_50_characters') }),
});

export const createSignUpSchema = (t: (id: string) => string) => z.object({
  password: z
    .string()
    .min(8, { message: t('Schema.SignUpSchema.Password_must_be_at_least_8_characters') })
    .max(50, { message: t('Schema.SignUpSchema.Password_cannot_exceed_50_characters') }),
  email: z.string().email({ message: t('Schema.SignUpSchema.Invalid_email_address') }),
});


export const createResetSchema = (t: (id: string) => string) => z.object({
  email: z.string().email({ message: t('Schema.ResetSchema.Invalid_email_address') }),
  password: z
    .string()
    .min(6, { message: t('Schema.ResetSchema.Password_must_be_at_least_6_characters') })
    .max(50, { message: t('Schema.ResetSchema.Password_cannot_exceed_50_characters') }),
  confirm: z
    .string()
    .min(6, { message: t('Schema.ResetSchema.Password_must_be_at_least_6_characters') })
    .max(50, { message: t('Schema.ResetSchema.Password_cannot_exceed_50_characters') }),
  verification_code: z.string().min(6).max(6, {
    message: t('Schema.ResetSchema.Verification_code_must_be_a_6_digit'),
  }),
});

export const createResetEmailSchema = (t: (id: string) => string) => z.object({
  email: z.string().email({ message: t('Schema.ResetSchema.Invalid_email_address') }),
  password: z.string().min(2).max(50),
});

export const createResetPasswordSchema = (t: (id: string) => string) => z.object({
  new_password: z
    .string()
    .min(6, { message: t('Schema.ResetSchema.Password_must_be_at_least_6_characters') })
    .max(50, { message: t('Schema.ResetSchema.Password_cannot_exceed_50_characters') }),
  old_password: z
    .string()
    .min(6, { message: t('Schema.ResetSchema.Password_must_be_at_least_6_characters') })
    .max(50, { message: t('Schema.ResetSchema.Password_cannot_exceed_50_characters') }),
});

export const createResetNameSchema = (t: (id: string) => string) => z.object({
  firstname: z
    .string()
    .min(2, { message: t('Schema.ResetSchema.First_name_must_be_at_least_2_characters') })
    .max(50, { message: t('Schema.ResetSchema.First_name_cannot_exceed_50_characters') }),
  lastname: z
    .string()
    .min(2, { message: t('Schema.ResetSchema.Last_name_must_be_at_least_2_characters') })
    .max(50, { message: t('Schema.ResetSchema.Last_name_cannot_exceed_50_characters') }),
});

export const createGenerateOutlineSchema = (t: (id: string) => string) => z.object({
  area: z.string().min(1, { message: t('Schema.GenerateOutlineSchema.Area_must_be_at_least_1_character') }),
  idea: z.string().min(1, { message: t('Schema.GenerateOutlineSchema.Description_must_be_at_least_1_character') }),
});
