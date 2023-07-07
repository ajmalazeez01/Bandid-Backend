const Yup = require('yup');

const bandValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  mobile: Yup.string()
    .required('Mobile number is required')
    .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  location: Yup.string().required('Location is required'),
  password: Yup.string()
  .required('Password is required')
  .min(6, 'Password must be at least 6 characters')
  .matches(
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
    'Password must contain at least one uppercase letter and one special character'
  ),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Confirm passwords must match')
});

module.exports = bandValidationSchema