// import { API_URLS } from "../constants/Urls";
import { API_URLS } from "../constants/urls";

export const fetchStores = async () => {
  try {
    const response = await fetch(API_URLS.STORES);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};