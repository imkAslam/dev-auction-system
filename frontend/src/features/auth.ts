import api from "../app/api";

export const SignIn = async (payload: object): Promise<any> => {
  try {
    const response = await api.post("/auth/login", {
      ...payload,
    });
    return response; // Handle the response data
  } catch (error) {
    console.error(error); // Handle any errors
    return error;
  }
};

export const RegisterUser = async (payload: object): Promise<any> => {
  try {
    const response = await api.post("/auth/register", {
      ...payload,
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
