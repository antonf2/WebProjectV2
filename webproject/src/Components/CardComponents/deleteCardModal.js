import Modal from "react-bootstrap/Modal";

export const DeleteCardModal = ({ show, handleClose, handleSubmit }) => {
  return (
    <div className="p-5">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete card?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <button
            className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="shadow bg-blue-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleSubmit}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
