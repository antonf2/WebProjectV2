import { GetCards } from "../API/cardAPI";
import { GetFavoriteCards } from "../API/favoritesAPI";

export const loadCardData = async (
  user,
  setFavorites,
  setCardDataReceived,
  setIsLoading,
  setError
) => {
  const response = await GetFavoriteCards(user);
  if (response && response.length > 0) {
    const cardIds = response.map((item) => item.Data.CardID);
    setFavorites(cardIds);
    await getCards(setCardDataReceived, setIsLoading, setError);
  } else {
    await getCards(setCardDataReceived, setIsLoading, setError);
  }
};

export const getCards = async (setCardDataReceived, setIsLoading, setError) => {
  try {
    const response = await GetCards();
    setCardDataReceived(response);
    setIsLoading(false);
  } catch (error) {
    console.error("Error getting cards data:", error);
    setError(error);
    setIsLoading(false);
  }
};
