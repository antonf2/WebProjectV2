import { useEffect, useState } from "react";
import { AddFavoriteCard, GetCards, GetFavoriteCards } from "../MISC/api";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import jwtDecode from "jwt-decode";
import { token } from "../MISC/commonUsage";
import { useNavigate } from "react-router-dom";

export const CustomCard = () => {
  const navigate = useNavigate();
  const [cardDataReceived, setCardDataReceived] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      loadCardData(decoded.Email);
    } else if (!token) {
      navigate("/login");
    }
  }, []);

  cardDataReceived.forEach((card) => {
    // initialFavorites[card.ItemID] =
  });

  const handleClick = (index) => {
    setExpanded(index === expanded ? null : index);
    console.log(favorites);
    console.log(decodedToken);
  };

  const handleFavorite = (itemID) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [itemID]: !prevFavorites[itemID],
    }));
    if (!favorites[itemID]) {
      favoriteToAPI(itemID);
    }
  };

  const favoriteToAPI = async (CardID) => {
    try {
      const response = await AddFavoriteCard(CardID, decodedToken.Email);
      console.log(response);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };
  const loadCardData = async (user) => {
    console.log(user);
    const response = await GetFavoriteCards(user);
    setFavorites(response);
    if (response) {
      console.log(response);
      getCards();
    }
  };

  const getCards = async () => {
    try {
      const response = await GetCards();
      setCardDataReceived(response);
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      console.error("Error getting cards data:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="router-div-css py-16 flex flex-col min-h-full bg-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold">Explore Our Cards</h2>
          <h3 className="text-xl font-bold mt-3">
            Select and press a card for more information about the business.
          </h3>
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
                    {favorites[card.ItemID] ? (
                      <FaHeart
                        className="text-stone-600 cursor-pointer text-xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavorite(card.ItemID);
                        }}
                      />
                    ) : (
                      <FaRegHeart
                        className="text-stone-600 cursor-pointer text-xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavorite(card.ItemID);
                        }}
                      />
                    )}
                  </div>
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
    </>
  );
};
