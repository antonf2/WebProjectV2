import axios from "axios";
import { projectId, url } from "../MISC/commonUsage";

export const GetFavoriteCards = async (user) => {
  const token = localStorage.getItem("USER_TOKEN");
  try {
    const response = await axios.get(`${url}/item/${projectId}_favorites/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data) {
      const existingItemWithSameUser = response.data.find(
        (item) => item.CreatedBy === user
      );
      if (existingItemWithSameUser) {
        return existingItemWithSameUser.Data;
      }
    }
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
          const response = await axios.put(
            `${url}/item/${projectId}_favorites/${existingItemWithSameUser.ItemID}/`,
            uploadData,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          return response;
        }
        return;
      }
    }

    if (existingItemWithSameUser) {
      const uploadData2 = {
        Data: [...existingItemWithSameUser.Data, ...favData],
      };
      await axios.put(
        `${url}/item/${projectId}_favorites/${existingItemWithSameUser.ItemID}/`,
        uploadData2,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return;
    } else {
      const uploadData = {
        Scope: "Public",
        Data: favData,
      };

      axios.post(`${url}/item/${projectId}_favorites/`, uploadData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return;
    }
  } catch (error) {
    console.error("Error managing favorite card:", error);
    throw error;
  }
};

export const DeleteFavoriteForAll = async (cardID, userToken) => {
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
    existingItems.map(async (item) => {
      const newItemsList = item.Data.filter((item) => item.ItemID !== cardID);
      const uploadData = {
        Data: newItemsList,
      };
      await axios.put(
        `${url}/item/${projectId}_favorites/${item.ItemID}/`,
        uploadData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    });
    return;
  } catch (error) {
    console.error("Error managing favorite card:", error);
    throw error;
  }
};
