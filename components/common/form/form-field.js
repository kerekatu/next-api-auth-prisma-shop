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
      {type === 'textarea' ? (
        <textarea
          type={type}
          id={name}
          name={name}
          value={value}
          className={`${error && 'input-error'}`}
          onChange={(e) => onChange(e)}
          {...props}
        ></textarea>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          className={`${error && 'input-error'}`}
          onChange={(e) => onChange(e)}
          {...props}
        />
      )}

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
    font-size: 1.8rem;
    color: rgba(var(--color-white-rgb), 0.6);
  }

  input,
  textarea {
    width: inherit;
    border: none;
    border-bottom: 0.1rem solid rgba(var(--color-white-rgb), 0.6);
    color: var(--color-white);
    padding: 0 1rem;
    background-color: transparent;
    height: 4.2rem;
    margin-top: 0.4rem;

    &:focus {
      border-bottom: 0.1rem solid rgba(var(--color-white-rgb), 1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 20rem;
  }

  .input-error {
    border-bottom: 0.1rem solid red;

    &:focus {
      border-bottom: 0.1rem solid red;
    }
  }
`

export default FormField
