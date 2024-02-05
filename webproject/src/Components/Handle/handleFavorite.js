import { ManageFavoriteCard } from "../API/favoritesAPI";

export const favoriteHandler = (
  itemID,
  favorites,
  setFavorites,
  userToken,
  userEmail
) => {
  const isFavorite = favorites.includes(itemID);

  setFavorites((prevFavorites) => {
    const newFavorites = isFavorite
      ? prevFavorites.filter((id) => id !== itemID)
      : [...prevFavorites, itemID];
    favoriteToAPI(itemID, userToken, userEmail);
    return newFavorites;
  });
};

const favoriteToAPI = async (CardID, userToken, userEmail) => {
  try {
    await ManageFavoriteCard(CardID, userEmail, userToken);
  } catch (error) {
    console.error("Error adding/removing favorite:", error);
  }
};
