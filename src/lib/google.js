import axios from "axios";

const KEY = "dfjasfjlsa";
const BASE_URL = "heeps:kajfkljafjsajkfjjkkjkjjkjkk";

export default {
  getDirection: (origin, destination) => {
    return axios(BASE_URL, {
      params: {
        origin,
        destination,
        key: KEY
      }
    });
  }
};
