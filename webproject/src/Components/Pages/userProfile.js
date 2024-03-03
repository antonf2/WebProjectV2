import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import EditUserProfile from "../MISC/editUser";
import { projectId } from "../MISC/commonUsage";

export const UserProfilePage = () => {
  const [data, setData] = useState({
    ProjectID: projectId,
    Name: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Role: "Select User Role",
  });
  const userData = useLoaderData();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (userData) {
      setData((prevData) => ({
        ...prevData,
        Name: userData.Name || prevData.Name,
        Email: userData.Email || prevData.Email,
        Role: userData.Role || prevData.Role,
      }));
    }
  }, [userData]);

  const handleEdit = () => {
    setShow(true);
  };

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
    } catch {}
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <div className="text-black container mx-auto my-8 p-8 ">
        <div className="max-w-2xl mx-auto bg-zinc-100 p-8 rounded shadow-md">
          <div className="text-center mb-4">
            <img
              src="https://placekitten.com/150/150"
              alt="Profile"
              className="rounded-full h-24 w-24 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold">{data.Name}</h2>
            <p className="text-gray-500">{data.Role}</p>
          </div>

          <div className="text-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Contact Information
              </h3>
              <p>Email: {data.Email}</p>
              <p>Password: {data.Password}</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-40"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      {show && (
        <EditUserProfile
          data={data}
          show={show}
          handleClose={handleClose}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};
