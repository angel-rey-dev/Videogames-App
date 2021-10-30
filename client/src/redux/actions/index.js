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
export function filterByGenre(payload) {
    return async (dispatch) => {
        let request = await axios.get("http://localhost:3001/genres")
        return dispatch({
            type: "FILTER_BY_GENRE",
            genres: request.data,
            payload
        })
    }
}

export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByRating(payload) {
    return {
        type: "ORDER_BY_RATING",
        payload
    }
}










