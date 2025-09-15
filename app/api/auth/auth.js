import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const BASE_PATH = "https://ogtv5ck91f.execute-api.ap-south-1.amazonaws.com/";

export const signin = (username, password, isGetSessionData = false) => {
  return axios.post(
    `${BASE_PATH}api/signin`,
    {
      username,
      password,
      deviceId: uuidv4(),
      isGetSessionData,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
