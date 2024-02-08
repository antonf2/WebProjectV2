import { ManageFavoriteCard } from "../API/favoritesAPI";

export const favoriteHandler = (
  itemID,
  favorites,
  setFavorites,
  userToken,
  userEmail
) => {
  const isFavorite = favorites.includes(itemID);
  const favData = [
    {
      Email: userEmail,
      Data: {
        ItemID: itemID,
      },
    },
  ];
  console.log(favData);

  setFavorites((prevFavorites) => {
    const newFavorites = isFavorite
      ? prevFavorites.filter((id) => id !== itemID)
      : [...prevFavorites, itemID];
    favoriteToAPI(itemID, userToken, userEmail, favData);
    return newFavorites;
  });
};

const favoriteToAPI = async (CardID, userToken, userEmail, favData) => {
  try {
    await ManageFavoriteCard(CardID, userEmail, userToken, favData);
  } catch (error) {
    console.error("Error adding/removing favorite:", error);
  }
};
