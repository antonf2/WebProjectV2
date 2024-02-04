import axios from "axios";
import { projectId, token, url } from "../MISC/commonUsage";

export const GetFavoriteCards = async (user) => {
  try {
    const response = await axios.get(`${url}/item/${projectId}_${user}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error getting favorites:", error);
    throw error;
  }
};

export const ManageFavoriteCard = async (CardID, user, userToken) => {
  try {
    if (!userToken) {
      throw new Error("User token not found in localStorage.");
    }

    const existingItemsResponse = await axios.get(
      `${url}/item/${projectId}_${user}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const existingItems = existingItemsResponse.data;

    const isDuplicate = existingItems.some(
      (item) => item.Data.CardID === CardID
    );

    if (isDuplicate) {
      const itemToDelete = existingItems.find(
        (item) => item.Data.CardID === CardID
      );

      if (itemToDelete) {
        const deleteResponse = await axios.delete(
          `${url}/item/${projectId}_${user}/${itemToDelete.ItemID}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      return;
    }

    const uploaddata = {
      Scope: "Public",
      Data: { CardID },
    };

    const response = axios.post(
      `${url}/item/${projectId}_${user}/`,
      uploaddata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error managing favorite card:", error);
    throw error;
  }
};
