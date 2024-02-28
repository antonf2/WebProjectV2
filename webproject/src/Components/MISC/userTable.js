import { Card, Table } from "@themesberg/react-bootstrap";
import { FaTrashAlt, FaCog } from "react-icons/fa";
import { useState } from "react";
import { EditUserByOwner } from "./editUserByOwner";
import { DeleteUserByOwner } from "./deleteUserByOwner";
import { EditUser } from "../API/userAPI";

export const UserTable = (users) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const usersList = users;
  const [chosenUser, setChosenUser] = useState("");

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (user) => {
    setChosenUser(user);
    setShowEdit(true);
  };
  const handleChangeEdit = (e) => {
    setChosenUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmitEdit = async () => {
    try {
      // console.log(chosenUser);
      console.log(chosenUser.Email);
      console.log(chosenUser.Password);
      console.log(chosenUser.Name);
      console.log(chosenUser.Role);
      const response = await EditUser({
        email: chosenUser.Email,
        name: chosenUser.Name,
        role: chosenUser.Role,
      });
      console.log("response:", response);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleSubmitDelete = () => {
    console.log("hi");
  };

  return (
    <>
      <Card
        border="light"
        className="table-wrapper table-responsive shadow-sm text-sm"
      >
        <Card.Body>
          <Table hover className="align-items-center ">
            <thead>
              <tr>
                <th className="border-bottom">Name</th>
                <th className="border-bottom ">Email</th>
                <th className="border-bottom">Role</th>
              </tr>
            </thead>
            <tbody>
              {usersList.users.map((user) => (
                <tr key={user.Email}>
                  <td>
                    <Card.Link className="d-flex align-items-center">
                      <div className="d-block">
                        <span className="fw-bold">{user.Name}</span>
                      </div>
                    </Card.Link>
                  </td>
                  <td>{user.Email}</td>
                  <td className="grid grid-cols-2">
                    {user.Role}
                    {user.Role !== "Owner" && (
                      <div className="grid grid-cols-2">
                        <FaCog
                          alt="gear edit button"
                          className="text-stone-600 cursor-pointer text-xl hover:text-black mr-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowEdit(user);
                          }}
                        />
                        <FaTrashAlt
                          alt="trash can delete button"
                          className="text-stone-600 cursor-pointer text-xl hover:text-black ml-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowDelete();
                          }}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <EditUserByOwner
        userData={chosenUser}
        setUserData={setChosenUser}
        show={showEdit}
        handleClose={handleCloseEdit}
        handleChange={handleChangeEdit}
        handleSubmit={handleSubmitEdit}
      />
      <DeleteUserByOwner
        show={showDelete}
        handleClose={handleCloseDelete}
        handleSubmit={handleSubmitDelete}
      />
    </>
  );
};
