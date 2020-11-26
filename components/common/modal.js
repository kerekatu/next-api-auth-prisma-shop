const Modal = ({ showModal, modalStatus, children }) => {
  return (
    <>
      {showModal && !modalStatus?.status ? (
        <div className="modal">
          <div className="modal-content">{children}</div>
        </div>
      ) : (
        modalStatus?.status && (
          <div className="modal">
            <div className="modal-content modal-message">
              {modalStatus.message}
            </div>
          </div>
        )
      )}
    </>
  )
}

export default Modal
