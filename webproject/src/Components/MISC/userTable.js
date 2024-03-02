import { Card, Table } from "@themesberg/react-bootstrap";
import { FaTrashAlt, FaCog } from "react-icons/fa";
import { useEffect, useState } from "react";
import { EditUserByOwner } from "./editUserByOwner";
import { DeleteUserByOwner } from "./deleteUserByOwner";
import { DeleteUser, EditUser } from "../API/userAPI";

export const UserTable = (users) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [usersList, setUsersList] = useState(users.users);
  const [chosenUser, setChosenUser] = useState("");
  const [userData, setUserData] = useState("");

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (user) => {
    setChosenUser(user);
    setUserData(user);
    setShowEdit(true);
  };
  const handleChangeEdit = (e) => {
    setChosenUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmitEdit = async () => {
    try {
      const response = await EditUser({
        oldEmail: userData.Email,
        email: chosenUser.Email,
        name: chosenUser.Name,
        role: chosenUser.Role,
      });
      if (response.status === 200) {
        const updatedUsersList = usersList.map((user) => {
          if (user === userData) {
            return chosenUser;
          }
          return user;
        });
        setUsersList(updatedUsersList);
      }
      setShowEdit(false);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (user) => {
    setChosenUser(user);
    setShowDelete(true);
  };
  const handleSubmitDelete = async () => {
    try {
      const response = await DeleteUser(chosenUser.Email);
      setShowDelete(false);
      if (response.request.status === 200) {
        const data = usersList.filter((user) => user !== chosenUser);
        setUsersList(data);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    console.log(users.users);
  }, []);

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
              {usersList.map((user) => (
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
                            handleShowDelete(user);
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
        oldData={userData}
        newData={chosenUser}
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
