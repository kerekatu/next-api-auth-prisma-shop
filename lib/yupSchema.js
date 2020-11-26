import * as yup from 'yup'

export const userSchema = yup.object().shape({
  username: yup
    .string()
    .required('username is required')
    .trim()
    .min(4, 'username must be at least 4 characters long'),
  password: yup
    .string()
    .required('password is required')
    .min(8, 'password must be at least 8 characters long')
})

export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required('name is required')
    .min(2, 'name must be at least 4 characters long'),
  email: yup.string().email('email is invalid').required('email is required'),
  phone: yup
    .string()
    .trim()
    .max(8, 'phone number cannot be longer than 8 characters'),
  message: yup
    .string()
    .required('message is required')
    .min(10, 'message must be longer than 10 characters')
})
