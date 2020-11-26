import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { withAuthServerSideProps } from '@/lib/withSession'
import { userSchema } from '@/lib/yupSchema'
import useForm from '@/hooks/useForm'
import { handleLogin } from '@/lib/api'
import styled from '@emotion/styled'
import Form from '@/components/common/form'
import FormField from '@/components/common/form/form-field'
import Layout from '@/components/containers/layout'
import { mq } from '@/styles/global'

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
    <Layout pageTitle="Login">
      <LoginWrapper>
        <Form
          submitText="Login"
          cancelButton={{
            text: 'Go Back',
            callback: () => router.replace('/'),
          }}
          error={formErrors?.errors?.responseError}
          onSubmit={handleSubmit}
        >
          <FormField
            label="Username"
            name="username"
            value={formValues.username}
            error={formErrors?.errors?.username}
            onChange={handleChange}
          />
          <FormField
            type="password"
            label="Password"
            name="password"
            value={formValues.password}
            error={formErrors?.errors?.password}
            onChange={handleChange}
          />
        </Form>
      </LoginWrapper>
    </Layout>
  )
}

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${mq[0]} {
    padding: 2rem;
  }

  form {
    background-color: var(--color-gray);
    width: 48rem;
    border-radius: 0.4rem;
    padding: 3rem;

    ${mq[0]} {
      width: 100%;
    }
  }
`

export const getServerSideProps = withAuthServerSideProps({})

export default LoginPage
