import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export const EditCardModal = ({
  show,
  cardData,
  handleClose,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="p-5">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create your own Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Business Name</Form.Label>
              <Form.Control
                name="title"
                value={cardData.title}
                onChange={handleChange}
                type="text"
                placeholder="HackerU"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                name="email"
                value={cardData.email}
                onChange={handleChange}
                type="text"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Phone</Form.Label>
              <Form.Control
                name="phone"
                value={cardData.phone}
                onChange={handleChange}
                type="text"
                placeholder="+1 (555) 111-1111"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                value={cardData.address}
                onChange={handleChange}
                type="text"
                placeholder="51, Hanasi st, New York, USA"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Clientele</Form.Label>
              <Form.Control
                name="clientele"
                value={cardData.clientele}
                onChange={handleChange}
                type="text"
                placeholder="Small businesses, startups, creative professionals"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>services</Form.Label>
              <Form.Control
                name="services"
                value={cardData.services}
                type="text"
                placeholder="Online Classes"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                type="text"
                onChange={handleChange}
                value={cardData.description}
                rows={2}
                placeholder="Describe your business"
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
