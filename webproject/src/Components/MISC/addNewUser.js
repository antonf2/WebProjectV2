import { Dropdown, Modal } from "@themesberg/react-bootstrap";
import { Form } from "@themesberg/react-bootstrap";

export const AddUserByOwner = ({
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
          <Modal.Title>Add new User</Modal.Title>
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
            <Form.Group>
              <Form.Label>User Type</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                  {data.Role}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    name="Role"
                    onClick={(e) => {
                      e.preventDefault();
                      handleChange({
                        target: {
                          name: e.target.name,
                          value: "Guest",
                        },
                      });
                    }}
                  >
                    Guest
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="Role"
                    onClick={(e) => {
                      e.preventDefault();
                      handleChange({
                        target: {
                          name: e.target.name,
                          value: "Business",
                        },
                      });
                    }}
                  >
                    Business
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
            Create
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
