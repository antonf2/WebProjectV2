import { useLoaderData } from "react-router-dom";

export const UserProfilePage = () => {
  const data = useLoaderData();

  const editProfile = () => {
    console.log("Hi");
  };
  return (
    <>
      <div className="container mx-auto my-8 p-8 ">
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
              onClick={editProfile}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-40"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
