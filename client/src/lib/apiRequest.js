import axios from "axios";

const apiRequest = axios.create({
    baseURL: "http://d2c28e730c15:3000/api",
    withCredentials: true,
});

export default apiRequest;