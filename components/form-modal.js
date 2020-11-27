import styled from '@emotion/styled'
import Form from '@/components/common/form'
import FormField from '@/components/common/form/form-field'
import useForm from '@/hooks/useForm'

const FormModal = ({
  showModal,
  modalStatus,
  action,
  handleModalForm,
  setShowModal,
  initialValues = {}
}) => {
  const { formErrors, handleChange, handleSubmit, formValues } = useForm(
    (values) => handleModalForm(values),
    initialValues,
    null
  )

  if (showModal) {
    return (
      <ModalWrapper>
        <div className="modal-content">
          <Form
            submitText="Submit"
            cancelButton={{
              text: 'Cancel',
              callback: () => setShowModal(false)
            }}
            error={formErrors?.errors?.responseError}
            onSubmit={handleSubmit}
          >
            {action === 'productsAdd' || action === 'productsEdit' ? (
              <>
                <FormField
                  label="title"
                  name="title"
                  value={formValues.title}
                  error={formErrors?.errors.title}
                  onChange={handleChange}
                />
                <FormField
                  label="description"
                  name="description"
                  value={formValues.description}
                  error={formErrors?.errors.description}
                  onChange={handleChange}
                />
                <FormField
                  label="image"
                  name="image"
                  type="file"
                  value={formValues.image}
                  error={formErrors?.errors.image}
                  onChange={handleChange}
                />
              </>
            ) : action === 'aboutEdit' ? (
              <FormField
                label="content"
                name="content"
                value={formValues.content}
                error={formErrors?.errors.content}
                onChange={handleChange}
              />
            ) : null}
          </Form>
          {modalStatus?.status && (
            <div className="modal-status">{modalStatus.message}</div>
          )}
        </div>
      </ModalWrapper>
    )
  } else return null
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;

  .modal-content {
    width: 70rem;
    background-color: var(--color-gray);
    padding: 6rem;
    border-radius: var(--border-radius);
  }

  .modal-status {
    margin-top: 2rem;
  }
`

export default FormModal
