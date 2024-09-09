import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://marred-global-cirrus.glitch.me/api",
    withCredentials: true,
});

export default apiRequest;