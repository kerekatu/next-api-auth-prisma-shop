import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { withAuthServerSideProps } from '../lib/withSession'
import { userSchema } from '../lib/yupSchema'
import useForm from '../hooks/useForm'
import { handleLogin } from '../lib/api'

const LoginPage = ({ user }) => {
  const router = useRouter()
  const initialFormValues = { username: '', password: '' }
  const { formErrors, handleChange, handleSubmit, formValues } = useForm(
    handleLogin,
    initialFormValues,
    userSchema
  )

  useEffect(() => {
    if (user.isLoggedIn) {
      router.replace('/')
    }
  }, [router, user])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formErrors?.errors?.responseError && (
          <div>{formErrors.errors.responseError}</div>
        )}
        <div>
          <label htmlFor="loginUsernameInput">Username</label>
          <input
            type="text"
            id="loginUsernameInput"
            name="username"
            value={formValues.username}
            onChange={(e) => handleChange(e)}
          />
          {formErrors?.errors?.username && (
            <div>{formErrors.errors.username}</div>
          )}
        </div>
        <div>
          <label htmlFor="loginPasswordInput">Password</label>
          <input
            type="password"
            id="loginPasswordInput"
            name="password"
            value={formValues.password}
            onChange={(e) => handleChange(e)}
          />
          {formErrors?.errors?.password && (
            <div>{formErrors.errors.password}</div>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export const getServerSideProps = withAuthServerSideProps()

export default LoginPage
