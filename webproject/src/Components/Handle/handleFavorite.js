import { ManageFavoriteCard } from "../API/favoritesAPI";

export const favoriteHandler = (
  itemID,
  favorites,
  setFavorites,
  userToken,
  userEmail,
  isFavoritesPage,
  cardDataReceived,
  setCardDataReceived
) => {
  const isFavorite = favorites.includes(itemID);
  const favData = [
    {
      ItemID: itemID,
    },
  ];
  try {
    setFavorites((prevFavorites) => {
      const newFavorites = isFavorite
        ? prevFavorites.filter((id) => id !== itemID)
        : [...prevFavorites, itemID];
      favoriteToAPI(
        itemID,
        userToken,
        userEmail,
        favData,
        isFavoritesPage,
        cardDataReceived,
        setCardDataReceived
      );
      return newFavorites;
    });
  } catch (error) {
    console.error("Error adding/removing favorite:", error);
  }
};

const favoriteToAPI = (
  CardID,
  userToken,
  userEmail,
  favData,
  isFavoritesPage,
  cardDataReceived,
  setCardDataReceived
) => {
  try {
    ManageFavoriteCard(CardID, userEmail, userToken, favData);
    if (isFavoritesPage === true) {
      const removeCard = cardDataReceived.filter(
        (card) => card.ItemID !== CardID
      );
      setCardDataReceived(removeCard);
    }
  } catch (error) {
    console.error("Error adding/removing favorite:", error);
  }
};
