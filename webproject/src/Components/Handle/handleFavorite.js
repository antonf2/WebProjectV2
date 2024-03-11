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
};

const favoriteToAPI = async (
  CardID,
  userToken,
  userEmail,
  favData,
  isFavoritesPage,
  cardDataReceived,
  setCardDataReceived
) => {
  console.log(CardID);
  console.log(favData);
  console.log(isFavoritesPage);
  console.log(cardDataReceived);
  try {
    const response = await ManageFavoriteCard(
      CardID,
      userEmail,
      userToken,
      favData
    );
    console.log(response);
    if (response.status === 200 && isFavoritesPage === true) {
      const removeCard = cardDataReceived.filter(
        (card) => card.ItemID !== CardID
      );
      setCardDataReceived(removeCard);
    }
  } catch (error) {
    console.error("Error adding/removing favorite:", error);
  }
};
