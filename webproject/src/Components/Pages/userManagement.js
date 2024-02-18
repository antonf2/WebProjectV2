import {
  Button,
  ButtonGroup,
  Row,
  Col,
  InputGroup,
  Form,
  Dropdown,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCog,
  faCheck,
  faSearch,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { token } from "../MISC/commonUsage";
import { UserTable } from "../MISC/userTable";

export const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const data = useLoaderData();

  useEffect(() => {
    if (token) {
      setUsers(data);
    }
  }, [data]);

  return (
    <div className="container bg-zinc-">
      <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="mb-4 mb-lg-0">
          <h1 className="text-3xl font-bold">Users List</h1>
        </div>
        <button size="block px-4 py-2 text-sm text-gray-700">
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New User
        </button>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={9} lg={4} className="d-flex">
            <InputGroup className="me-2 me-lg-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
        </Row>
      </div>
      <UserTable users={data} />
    </div>
  );
};
