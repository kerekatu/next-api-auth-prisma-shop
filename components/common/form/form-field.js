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
        className={`${error && 'input-error'}`}
        onChange={(e) => onChange(e)}
        {...props}
      />
      {error && <div className="error">{error}</div>}
    </FieldWrapper>
  )
}

const FieldWrapper = styled.div`
  width: 100%;

  & + & {
    margin-top: 2rem;
  }

  label {
    display: block;
  }

  input {
    width: inherit;
    border: 0.1rem solid #ddd;
    border-radius: 0.4rem;
    padding: 0 1rem;
    height: 4.2rem;
    margin-top: 0.4rem;
  }

  .input-error {
    border: 0.1rem solid red;
  }
`

export default FormField
