import styled from '@emotion/styled'

const FormField = ({
  label = '',
  type = 'text',
  name,
  error,
  value = '',
  onChange,
  ...props
}) => {
  return (
    <FieldWrapper>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        {...props}
      />
      {error && <div className="error">{error}</div>}
    </FieldWrapper>
  )
}

const FieldWrapper = styled.div``

export default FormField
