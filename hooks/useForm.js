import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const useForm = (
  callback,
  initialValues = {},
  validationSchema,
  redirect = false
) => {
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({ errors: {}, isValid: false })
  const router = useRouter()

  useEffect(() => {
    if (!formErrors.isValid) return

    callback(formValues).then((response) => {
      if (!response.success) {
        return setFormErrors({
          errors: { responseError: response?.message },
          isValid: false
        })
      }

      if (redirect) return router.replace('/')

      return response
    })
  }, [callback, formErrors, formValues, router, redirect])

  const validateForm = async () => {
    return await validationSchema
      .validate(formValues, { abortEarly: false })
      .then(() => setFormErrors({ errors: {}, isValid: true }))
      .catch((error) => {
        let errors = {}
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
    setFormValues({ ...formValues, [name]: value })

    console.log(formValues)
  }

  const handleSubmit = () => {
    if (validationSchema !== null) return validateForm()

    setFormErrors({ errors: {}, isValid: true })
  }

  return {
    formErrors,
    handleChange,
    handleSubmit,
    formValues
  }
}

export default useForm
