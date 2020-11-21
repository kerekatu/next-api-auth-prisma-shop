import Button from '@/components/common/button'

const Form = ({ onSubmit, submitText, error, cancelButton, children }) => {
  return (
    <form
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
    </form>
  )
}

export default Form
