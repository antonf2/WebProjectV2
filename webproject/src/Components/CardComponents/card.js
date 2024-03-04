import { useEffect, useState } from "react";
import { FaCog, FaHeart, FaTrashAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { favoriteHandler } from "../Handle/handleFavorite";
import { handleDeleteCard } from "../Handle/handleDeleteCard";
import jwtDecode from "jwt-decode";
import { Form, InputGroup } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const CustomCard = ({
  show,
  token,
  dataFavorites,
  dataCardDataReceived,
  dataLoading,
  dataError,
  pageMessage,
}) => {
  const [cardDataReceived, setCardDataReceived] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const userToken = localStorage.getItem("USER_TOKEN");
  const decode = jwtDecode(userToken);
  const [searchValue, setSearchValue] = useState("");
  const [originalCardData, setOriginalCardData] = useState([]);

  useEffect(() => {
    if (token) {
      setFavorites(dataFavorites);
      setCardDataReceived(dataCardDataReceived);
      setOriginalCardData(dataCardDataReceived);
      setIsLoading(dataLoading);
      setError(dataError);
    }
  }, [token, dataFavorites, dataCardDataReceived, dataLoading, dataError]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCards = originalCardData.filter((card) =>
      card.Data.title.toLowerCase().includes(searchTerm)
    );

    setSearchValue(e.target.value);
    setCardDataReceived(searchTerm ? filteredCards : originalCardData);
  };

  const handleClick = (index) => {
    setExpanded(index === expanded ? null : index);
  };

  const handleDelete = (itemID) => {
    handleDeleteCard(itemID, userToken, setCardDataReceived, cardDataReceived);
  };

  const handleFavorite = (itemID) => {
    favoriteHandler(itemID, favorites, setFavorites, userToken, token.Email);
  };

  return (
    <div>
      <section className="router-div-css py-16 flex flex-col min-h-min bg-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold">{pageMessage}</h2>
          <h3 className="text-xl font-bold mt-3">
            Select and press a card for more information about the business.
          </h3>
          <InputGroup className="container me-2 me-lg-3">
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
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-5 items-center">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading data</p>
          ) : (
            cardDataReceived.map((card, index) => (
              <div
                key={index}
                className={`mb-4 card h-96 bg-cover bg-center ${
                  index === expanded ? "selected" : "w-60"
                }`}
                onClick={() => handleClick(index)}
              >
                <div className="card-content flex flex-col text-center pb-4 font-normal p-2 relative">
                  <div className="absolute top-3 right-3">
                    {favorites.includes(card.ItemID) ? (
                      <FaHeart
                        alt="favorite heart button - full"
                        className="text-stone-600 cursor-pointer text-xl hover:text-black"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavorite(card.ItemID);
                        }}
                      />
                    ) : (
                      <FaRegHeart
                        alt="favorite heart button - empty"
                        className="text-stone-600 cursor-pointer text-xl hover:text-black"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavorite(card.ItemID);
                        }}
                      />
                    )}
                  </div>
                  {card.CreatedBy === decode.Email && (
                    <div className="absolute top-3 left-3 grid, grid grid-cols-2">
                      <FaTrashAlt
                        alt="trash can delete button"
                        className="text-stone-600 cursor-pointer text-xl hover:text-black"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(card.ItemID);
                        }}
                      />
                      <FaCog
                        alt="gear edit button"
                        className="text-stone-600 cursor-pointer text-xl hover:text-black mr-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          show(card);
                        }}
                      />
                    </div>
                  )}
                  {index !== expanded && (
                    <p className="text-dark-800">{card.Data.description}</p>
                  )}
                  {index === expanded && (
                    <>
                      <p className="text-dark-800">{card.Data.services}</p>
                      <p className="text-dark-800">{card.Data.clientele}</p>
                      <p className="text-dark-800">{card.Data.portfolio}</p>
                      <p className="text-dark-800">{card.Data.email}</p>
                      <p className="text-dark-800">{card.Data.phone}</p>
                      <p className="text-dark-800">{card.Data.address}</p>
                    </>
                  )}
                </div>
                <div className="card-footer rounded-b-3xl bg-opacity-75 justify-center">
                  <h2 className="footer-description text-xl font-semibold text-center">
                    {card.Data.title}
                  </h2>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
