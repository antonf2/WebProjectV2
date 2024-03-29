import { Row, Col, InputGroup, Form } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { projectId, token } from "../MISC/commonUsage";
import { UserTable } from "../MISC/userTable";
import { AddUserByOwner } from "../MISC/addNewUser";
import { RegisterUser } from "../API/userAPI";

export const UserManagementPage = () => {
  const data = useLoaderData();
  const [filteredUsers, setFilteredUsers] = useState(data);
  const [users, setUsers] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    ProjectID: projectId,
    Name: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Role: "Select User Role",
  });

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleChange = (e) => {
    setNewUserForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddUser = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await RegisterUser(newUserForm);
      if (response.success === "post call succeed!") {
        setShow(false);
        setUsers(users.push(response.data));
      }
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  useEffect(() => {
    if (token) {
      const filteredUsers = searchValue
        ? data.filter((user) =>
            user.Name.toLowerCase().includes(searchValue.toLowerCase())
          )
        : data;
      setFilteredUsers(filteredUsers);
    }
  }, [data, searchValue]);

  return (
    <div className="container bg-zinc-">
      <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="mb-4 mb-lg-0">
          <h1 className="text-3xl font-bold">Users List</h1>
        </div>
        <button
          onClick={handleAddUser}
          size="block px-4 py-2 text-sm text-gray-700"
        >
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
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </InputGroup>
          </Col>
        </Row>
      </div>
      <UserTable users={filteredUsers} />
      <AddUserByOwner
        data={newUserForm}
        show={show}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
