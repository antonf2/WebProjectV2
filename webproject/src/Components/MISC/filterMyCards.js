export const FilterMyCards = (cardData, userToken) => {
  const myCards = [];
  cardData.map((card) => {
    if (card.CreatedBy === userToken) {
      myCards.push(card);
      return myCards;
    }
  });
  return myCards;
};
