import axios from "axios";
import { projectId, token, url } from "../MISC/commonUsage";

export const GetFavoriteCards = async (user) => {
  try {
    const response = await axios.get(`${url}/item/${projectId}_favorites/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const existingItemWithSameUser = response.data.find(
      (item) => item.CreatedBy === user
    );
    return existingItemWithSameUser.Data;
  } catch (error) {
    console.error("Error getting favorites:", error);
    throw error;
  }
};

export const ManageFavoriteCard = async (CardID, user, userToken, favData) => {
  try {
    if (!userToken) {
      throw new Error("User token not found in localStorage.");
    }

    const existingItemsResponse = await axios.get(
      `${url}/item/${projectId}_favorites/`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const existingItems = existingItemsResponse.data;
    const existingItemWithSameUser = existingItems.find(
      (item) => item.CreatedBy === user
    );
    if (existingItemWithSameUser) {
      const isDuplicate = existingItemWithSameUser.Data.some(
        (item) => item.ItemID === CardID
      );

      if (isDuplicate) {
        const itemToDelete = existingItemWithSameUser.Data.find(
          (item) => item.ItemID === CardID
        );
        const newItemsList = existingItemWithSameUser.Data.filter(
          (item) => item.ItemID !== CardID
        );
        const uploadData = {
          Data: newItemsList,
        };

        if (itemToDelete) {
          await axios.put(
            `${url}/item/${projectId}_favorites/${existingItemWithSameUser.ItemID}/`,
            uploadData,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
        }
        return;
      }
    }

    if (existingItemWithSameUser) {
      const uploadData2 = {
        Data: [...existingItemWithSameUser.Data, ...favData],
      };
      const response = await axios.put(
        `${url}/item/${projectId}_favorites/${existingItemWithSameUser.ItemID}/`,
        uploadData2,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return response.data;
    } else {
      const uploadData = {
        Scope: "Public",
        Data: favData,
      };

      const response = await axios.post(
        `${url}/item/${projectId}_favorites/`,
        uploadData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      return response.data;
    }
  } catch (error) {
    console.error("Error managing favorite card:", error);
    throw error;
  }
};
