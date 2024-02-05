import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { favoriteHandler } from "../Handle/handleFavorite";

export const CustomCard = ({
  token,
  dataFavorites,
  dataCardDataReceived,
  dataLoading,
  dataError,
}) => {
  const [cardDataReceived, setCardDataReceived] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const userToken = localStorage.getItem("USER_TOKEN");

  useEffect(() => {
    if (token) {
      setFavorites(dataFavorites);
      setCardDataReceived(dataCardDataReceived);
      setIsLoading(dataLoading);
      setError(dataError);
    }
  }, []);

  const handleClick = (index) => {
    setExpanded(index === expanded ? null : index);
  };

  const handleFavorite = (itemID) => {
    const response = favoriteHandler(
      itemID,
      favorites,
      setFavorites,
      userToken,
      token.Email
    );
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
                    {favorites.includes(card.ItemID) ? (
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
