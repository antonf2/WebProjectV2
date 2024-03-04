import { DeleteCard } from "../API/cardAPI";
import { DeleteFavoriteForAll } from "../API/favoritesAPI";

export const handleDeleteCard = async (
  itemID,
  userToken,
  setCardDataReceived,
  cardDataReceived
) => {
  try {
    await DeleteFavoriteForAll(itemID, userToken);
    const response = await DeleteCard(itemID, userToken);
    if (response.status === 200) {
      const cardData = cardDataReceived.filter(
        (item) => item.ItemID !== itemID
      );
      setCardDataReceived(cardData);
    }
  } catch (error) {
    console.error("Error removing favorites:", error);
  }
};
