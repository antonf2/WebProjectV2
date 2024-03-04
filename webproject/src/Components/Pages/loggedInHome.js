import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { CustomCard } from "../CardComponents/card";
import { AddCard, EditCard } from "../API/cardAPI";
import { useLoaderData } from "react-router-dom";
import { CardModal } from "../CardComponents/cardModal";
import { EditCardModal } from "../CardComponents/editCardModal";

export const LoggedInHomePage = () => {
  const message = "Explore Our Cards";
  const UserToken = jwtDecode(localStorage.getItem("USER_TOKEN"));
  const data = useLoaderData();
  const [newData, setNewData] = useState(data.cardDataReceived);
  const [showButton, setShowButton] = useState(false);
  const [itemID, setItemID] = useState("");
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

  const handleOpenEdit = (card) => {
    setItemID(card.ItemID);
    setCardData((prevData) => ({
      ...prevData,
      email: card.Data.email || prevData.email,
      phone: card.Data.phone || prevData.phone,
      services: card.Data.services || prevData.services,
      title: card.Data.title || prevData.title,
      description: card.Data.description || prevData.description,
      address: card.Data.address || prevData.address,
      clientele: card.Data.clientele || prevData.clientele,
      createdBy: card.CreatedBy,
    }));
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  const handleChange = (e) => {
    setCardData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitEdit = async (e) => {
    try {
      const response = await EditCard(cardData, itemID);
      if (response.status === 200) {
        setNewData((prev) => {
          const updatedCard = prev.map((card) => {
            if (card.ItemID === itemID) {
              setShowEdit(false);
              return { ...card, Data: cardData };
            }
            return card;
          });
          return updatedCard;
        });
      }
    } catch (error) {
      console.error("Error editing user: ", error);
    }
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
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="bg-zinc-200 min-h-fit mb-16 router-div-css text-center ">
      <CustomCard
        show={handleOpenEdit}
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
      <EditCardModal
        show={showEdit}
        cardData={cardData}
        handleClose={handleCloseEdit}
        handleChange={handleChange}
        handleSubmit={handleSubmitEdit}
      />
    </div>
  );
};
