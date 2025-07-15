// validationSchema.ts
import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8)
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+[\]{}-]).*$/,
      "Password must have 1 uppercase, 1 number & 1 special char"
    ),
});
