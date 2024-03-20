import { ManageFavoriteCard } from "../API/favoritesAPI";

export const favoriteHandler = async (
  itemID,
  favorites,
  setFavorites,
  userToken,
  userEmail,
  isFavoritesPage,
  cardDataReceived,
  setCardDataReceived,
  setLoading
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
  } finally {
    setLoading(false);
  }
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
  try {
    const response = await ManageFavoriteCard(
      CardID,
      userEmail,
      userToken,
      favData
    );
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
