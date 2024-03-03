import { Form, Modal } from "@themesberg/react-bootstrap";

const EditUserProfile = ({
  data,
  show,
  handleClose,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="p-5">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="Name"
                value={data.Name}
                onChange={handleChange}
                type="text"
                placeholder="HackerU"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="Email"
                value={data.Email}
                onChange={handleChange}
                type="text"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="Password"
                value={data.Password}
                onChange={handleChange}
                type="password"
                placeholder="*****"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="ConfirmPassword"
                value={data.ConfirmPassword}
                onChange={handleChange}
                type="password"
                placeholder="*****"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
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
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditUserProfile;
