import { Dropdown, Modal } from "@themesberg/react-bootstrap";
import { Form } from "@themesberg/react-bootstrap";

export const EditUserByOwner = ({
  newData,
  show,
  handleClose,
  handleChange,
}) => {
  return (
    <div className="p-5">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user details & role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="Name"
                value={newData.Name}
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
                value={newData.Email}
                onChange={handleChange}
                type="text"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>User Type</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                  {newData.Role}
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
          >
            Cancel
          </button>
          <button
            className="shadow bg-blue-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
