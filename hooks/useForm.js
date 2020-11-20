import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const useForm = (callback, initialValues = {}, validationSchema) => {
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

      router.replace('/')
    })
  }, [callback, formErrors, formValues, router])

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
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    validateForm()
  }

  return {
    formErrors,
    handleChange,
    handleSubmit,
    formValues
  }
}

export default useForm
