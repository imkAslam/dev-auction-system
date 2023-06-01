import api from "../app/api";

export const getAmount = async (): Promise<any> => {
  try {
    const response = await api.get("/payment");
    return response; // Handle the response data
  } catch (error) {
    console.error(error); // Handle any errors
    return error;
  }
};

export const addAmount = async (payload: object): Promise<any> => {
  try {
    const response = await api.post("/payment", payload);
    return response; // Handle the response data
  } catch (error) {
    console.error(error); // Handle any errors
    return error;
  }
};

export const getAllAuctionItems = async (): Promise<any> => {
  try {
    const response = await api.get("/auction/items");
    return response; // Handle the response data
  } catch (error) {
    console.error(error); // Handle any errors
    return error;
  }
};

export const addAuctionItems = async (payload: object): Promise<any> => {
  try {
    const response = await api.post("/auction/create-item", payload);
    return response; // Handle the response data
  } catch (error) {
    console.error(error); // Handle any errors
    return error;
  }
};

export const placeBid = async (payload: object): Promise<any> => {
  try {
    const response = await api.post("bid/auction", payload);
    return response; // Handle the response data
  } catch (error) {
    console.error(error); // Handle any errors
    return error;
  }
};
