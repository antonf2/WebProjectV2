import { Modal } from "@themesberg/react-bootstrap";

export const DeleteUserByOwner = ({ show, handleClose, handleSubmit }) => {
  return (
    <div className="p-5">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="text-center" closeButton>
          <Modal.Title>Are you sure you want to delete the user?</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="grid grid-cols-2 gap-5 place-items-center">
          <div>
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleSubmit}
            >
              Delete
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
