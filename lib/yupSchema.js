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
