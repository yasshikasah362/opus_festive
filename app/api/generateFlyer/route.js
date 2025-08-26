import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const generateFlyer = async (prompt, inputImageUrl) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/generateFlyer`, {
      prompt,
      inputImageUrl
    });
    return response.data; // { flyerDescription: "..."}
  } catch (error) {
    console.error("Error generating flyer:", error);
    throw error;
  }
};