import axios from "axios";
import { projectId, token, url, userToken } from "../MISC/commonUsage";

export const GetCards = async () => {
  try {
    const response = await axios.get(`${url}/item/${projectId}_BusinessCard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error getting cards:", error);
    throw error;
  }
};

export const AddCard = async (cardData) => {
  var uploaddata = {
    Scope: "Public",
    Data: cardData,
  };
  try {
    if (!userToken) {
      throw new Error(`User token not found in localStorage`);
    }
    const response = axios.post(
      `${url}/item/${projectId}_BusinessCard`,
      uploaddata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating card:", error);
    throw error;
  }
};

export const DeleteCard = async (itemId, userToken) => {
  try {
    if (!userToken) {
      throw new Error("User token not found in localStorage.");
    }
    const response = axios.delete(
      `${url}/item/${projectId}_BusinessCard/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

export const EditCard = async (cardData, itemID) => {
  var uploaddata = {
    Scope: "Public",
    Data: cardData,
  };
  try {
    if (!token) {
      throw new Error("User token not found in localStorage.");
    }
    const response = await axios.put(
      `${url}/item/${projectId}_BusinessCard/${itemID}/`,
      uploaddata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error editing card:", error);
    throw error;
  }
};

export const GetCard = (itemId) => {
  try {
    if (!token) {
      throw new Error("User token not found in localStorage.");
    }
    const response = axios.get(
      `${url}/item/${projectId}_BusinessCard/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting cards:", error);
    throw error;
  }
};
