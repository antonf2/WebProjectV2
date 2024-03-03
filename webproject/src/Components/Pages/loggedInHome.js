import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { CustomCard } from "../CardComponents/card";
import { AddCard } from "../API/cardAPI";
import { useLoaderData } from "react-router-dom";
import { CardModal } from "../CardComponents/cardModal";

export const LoggedInHomePage = () => {
  const message = "Explore Our Cards";
  const UserToken = jwtDecode(localStorage.getItem("USER_TOKEN"));
  const data = useLoaderData();
  const [newData, setNewData] = useState(data.cardDataReceived);
  const [showButton, setShowButton] = useState(false);
  const [cardData, setCardData] = useState({
    title: "",
    description: "",
    services: "",
    clientele: "",
    email: "",
    phone: "",
    address: "",
    createdBy: UserToken.Email,
  });

  useEffect(() => {
    if (UserToken) {
      if (UserToken.Role !== "Guest") {
        setShowButton(true);
      }
    }
  }, [UserToken]);
  const handleChange = (e) => {
    setCardData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    try {
      const response = await AddCard(cardData);
      if (response.status === 200) {
        setNewData((prevCardData) => [...prevCardData, response.data]);
        setShow(false);
      }
    } catch (error) {
      console.error("Error Creating Card:", error);
    }
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="bg-zinc-200 min-h-fit mb-16 router-div-css text-center ">
      <CustomCard
        token={UserToken}
        dataFavorites={data.favorites}
        dataCardDataReceived={newData}
        dataLoading={data.loading}
        dataError={data.error}
        pageMessage={message}
      />
      {showButton ? (
        <button
          type="button"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5"
          onClick={handleShow}
        >
          Want to create your own card? Press here
        </button>
      ) : null}
      <CardModal
        show={show}
        cardData={cardData}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
