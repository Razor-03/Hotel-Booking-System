import apiRequest from "./apiRequest";
import { defer } from "react-router-dom"

export const singleRoomLoader = async ({request, params}) => {
    const res = await apiRequest("/rooms/" + params.id);
    return res.data;
};

export const roomsListLoader = async ({request, params}) => {
    const query = request.url.split("?")[1];
    const postPromise = apiRequest("/rooms?" + query);
    return defer({
        postResponse: postPromise,
    });
};