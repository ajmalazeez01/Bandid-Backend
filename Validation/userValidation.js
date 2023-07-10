const Yup = require("yup");

const userValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z\s]+$/, "Name can only include letters"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]+$/, "Mobile number can only include numbers")
    .min(10, "Mobile number must be exactly 10 digits")
    .max(10, "Mobile number must be exactly 10 digits"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
      "Password must contain at least one uppercase letter and one special character"
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Confirm passwords must match"
  ),
});

module.exports = userValidationSchema;
