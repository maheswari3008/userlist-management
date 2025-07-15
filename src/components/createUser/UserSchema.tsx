import * as yup from "yup";

export const userFormSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required!")
    .matches(/^[A-Za-z ]+$/, "Only alphabets and spaces are allowed"),
  lastName: yup
    .string()
    .required("Last name is required!")
    .matches(/^[A-Za-z ]+$/, "Only alphabets and spaces are allowed"),
  email: yup
    .string()
    .required("Email is required!")
    .email("Enter a valid email address!"),
  imageLink: yup
    .string()
    .required("Image link is required!")
    .test(
      "is-valid-image-url-or-base64",
      "Enter a valid image URL or base64 string",
      (value) =>
        typeof value === "string" &&
        (/^https?:\/\/.+/i.test(value) || // allow any http/https link
          value.startsWith("data:image/")) // or base64
    ),
});
