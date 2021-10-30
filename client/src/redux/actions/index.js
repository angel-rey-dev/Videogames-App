import axios from "axios";

export function getAllGames() {
    return async (dispatch) => {
        let request = await axios.get("http://localhost:3001/videogames")
        return dispatch({
            type: "GET_ALL_VIDEOGAMES",
            payload: request.data
        })
    }
}
export function filterByOrigin(payload) {
    return {
        type: "FILTER_BY_ORIGIN",
        payload
    }
}



