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
export function getAllGenres() {
    return async (dispatch) => {
        let request = await axios.get("http://localhost:3001/genres")
        return dispatch({
            type: "GET_ALL_GENRES",
            payload: request.data.map(genre => genre.name),
        })
    }
}
export function searchByName(name) {
    return async (dispatch) => {
        try {
            let json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: "SEARCH_BY_NAME",
                payload: json.data,
            })
        } catch (error) {
            console.log(error)
            return dispatch({
                type: "SEARCH_BY_NAME",
                payload: []
            })
        }
    } 
}
export function filterByOrigin(payload) {
    return {
        type: "FILTER_BY_ORIGIN",
        payload
    }
}

export function filterByGenre(payload) {
    return {
        type: "FILTER_BY_GENRE",
        payload
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










