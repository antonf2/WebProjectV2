export const FilterFavorites = (favorites, cardData) => {
  const favoriteCards = [];
  favorites.map((data) =>
    cardData.map((card) => {
      if (data === card.ItemID) {
        favoriteCards.push(card);
        return favoriteCards;
      }
    })
  );
  return favoriteCards;
};
