import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { withAuthServerSideProps } from '../lib/withSession'
import { userSchema } from '../lib/yupSchema'

const LoginPage = ({ user }) => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  const [formErrors, setFormErrors] = useState({ errors: {}, isValid: false })
  const [formIsSubmitting, setFormIsSubmitting] = useState(false)
  const router = useRouter()

  const runValidation = async (schema, form) => {
    return await schema
      .validate(form, { abortEarly: false })
      .then(() => setFormErrors({ errors: {}, isValid: true }))
      .catch((error) => {
        const errors = {}
        error.inner.forEach((item) => {
          if (!errors[item.path]) {
            errors[item.path] = item.message
          }
        })

        setFormErrors({ errors, isValid: false })
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    runValidation(userSchema, form)

    setFormIsSubmitting(true)
  }

  useEffect(() => {
    if (user.isLoggedIn) {
      router.replace('/')
    }
  }, [router, user])

  useEffect(() => {
    const handleLogIn = async () => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      if (response.ok) {
        router.replace('/')
      }
    }

    if (formErrors.isValid && formIsSubmitting) {
      handleLogIn()
    } else {
      setFormIsSubmitting(false)
    }
  }, [formErrors, formIsSubmitting, form, router])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginUsernameInput">Username</label>
          <input
            type="text"
            id="loginUsernameInput"
            name="username"
            value={form.username}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="loginPasswordInput">Password</label>
          <input
            type="password"
            id="loginPasswordInput"
            name="password"
            value={form.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export const getServerSideProps = withAuthServerSideProps()

export default LoginPage
