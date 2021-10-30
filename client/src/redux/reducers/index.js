
const initialState = {
    videogames: [],
    allVideogames: []
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        //------------------------------------
        case "GET_ALL_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            };
        //------------------------------------
        // case "FILTER_BY_GENRE":
        //     const 
        //     return { ...state };
        // //------------------------------------
        case "FILTER_BY_ORIGIN":
            const allVideogamesCopy = [...state.videogames]
            const originFiltered = action.payload === "user"
                ? allVideogamesCopy.filter(game => game.createdInDb)
                : allVideogamesCopy.filter(game => !game.createdInDb)
            return {
                ...state,
                allVideogames: action.payload === "all" ? state.videogames : originFiltered
            };
        // //------------------------------------
        // case "ORDER_BY_NAME":
        //     return { ...state };
        // //------------------------------------
        // case "ORDER_BY_RATING":
        //     return { ...state };
        // //------------------------------------

        default: return state
    }
}