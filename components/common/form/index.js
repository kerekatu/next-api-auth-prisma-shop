import Button from '@/components/common/button'
import styled from '@emotion/styled'

const Form = ({ onSubmit, submitText, error, cancelButton, children }) => {
  return (
    <FormWrapper
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      {error && <div className="error">{error}</div>}
      {children}
      <div className="form-submit">
        <Button type="submit" className="primary">
          {submitText}
        </Button>
        {cancelButton && (
          <Button className="secondary" onClick={cancelButton.callback}>
            {cancelButton.text}
          </Button>
        )}
      </div>
    </FormWrapper>
  )
}

const FormWrapper = styled.form`
  width: 100%;

  .form-submit {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
  }
`

export default Form
