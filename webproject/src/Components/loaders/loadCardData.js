import jwtDecode from "jwt-decode";
import { GetCards } from "../API/cardAPI";
import { GetFavoriteCards } from "../API/favoritesAPI";

export const loadCardData = async () => {
  const UserToken = jwtDecode(localStorage.getItem("USER_TOKEN"));
  const user = UserToken.Email;

  try {
    const response = await GetFavoriteCards(user);
    let favorites = [];

    if (response && response.length > 0) {
      favorites = response.map((item) => item.Data.CardID);
    }

    const { cardDataReceived, loading, error } = await getCards();

    return {
      favorites,
      cardDataReceived,
      loading,
      error,
    };
  } catch (error) {
    console.error("Error loading card data:", error);
    return {
      favorites: [],
      cardDataReceived: [],
      loading: false,
      error,
    };
  }
};

export const getCards = async () => {
  try {
    const cardDataReceived = await GetCards();
    const loading = false;

    return {
      cardDataReceived,
      loading,
      error: null,
    };
  } catch (error) {
    console.error("Error getting cards data:", error);
    return {
      cardDataReceived: [],
      loading: false,
      error,
    };
  }
};
