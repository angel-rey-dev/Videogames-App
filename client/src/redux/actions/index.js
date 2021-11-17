import axios from "axios";

export function getAllGames() {
    return async (dispatch) => {
        let request = await axios.get("/videogames")
        return dispatch({
            type: "GET_ALL_VIDEOGAMES",
            payload: request.data
        })
    }
}
export function getAllGenres() {
    return async (dispatch) => {
        let json = await axios.get("/genres")
        return dispatch({
            type: "GET_ALL_GENRES",
            payload: json.data.map(genre => genre.name),
        })
    }
}
export function getAllPlatforms() {
    return async (dispatch) => {
        let json = await axios.get("/platforms")
        return dispatch({
            type: "GET_ALL_PLATFORMS",
            payload: json.data,
        })
    }
}
export function searchByName(name) {
    return async (dispatch) => {
        try {
            let json = await axios.get(`/videogames?name=${name}`)
            return dispatch({
                type: "SEARCH_BY_NAME",
                payload: json.data,
            })
        } catch (error) {
            console.log(error)
            return dispatch({
                type: "SEARCH_BY_NAME",
                payload: "Not Found"
            })
        }
    }
}
export function postNewVideogame(videogame) {
    return async (dispatch) => {
        try {
            let json = await axios.post("/videogame", videogame)
            return dispatch({
                type: "POST_NEW_VIDEOGAME",
                payload: json.data,
            })
        } catch (error) {
            console.log(error)
            return dispatch({
                type: "POST_NEW_VIDEOGAME",
                payload: []
            })
        }
    }
}
export function getVideogameDetail(id) {
    return async (dispatch) => {
        try {
            let json = await axios.get(`/videogame/${id}`)
            return dispatch({
                type: "GET_VIDEOGAME_DETAIL",
                payload: json.data,
            })
        }

        catch (error) {
            console.log(error)
            return dispatch({
                type: "GET_VIDEOGAME_DETAIL",
                payload: []
            })
        }

    }
}
export function orderBy(payload) {
    return {
        type: "ORDER_BY",
        payload
    }
}
export function filterBy(payload) {
    return {
        type: "FILTER_BY",
        payload
    }
}