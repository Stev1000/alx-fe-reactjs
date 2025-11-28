import axios from "axios";

const BASE_URL = "https://api.github.com/users/";

async function fetchUserData(username) {
  try {
    const response = await axios.get(`${BASE_URL}${username}`);
    return response.data;
  } catch (error) {
    return { message: "Not Found" };
  }
}

export default fetchUserData;
