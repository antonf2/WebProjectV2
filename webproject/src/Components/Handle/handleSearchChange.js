export const handleCardSearchChange = (
  e,
  setSearchValue,
  setCardDataReceived,
  originalCardData
) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredCards = originalCardData.filter((card) =>
    card.Data.title.toLowerCase().includes(searchTerm)
  );

  setSearchValue(e.target.value);
  setCardDataReceived(searchTerm ? filteredCards : originalCardData);
};
