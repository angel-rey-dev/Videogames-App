
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
            let originFiltered = [...state.videogames] 
        if (action.payload === "user") originFiltered = allVideogamesCopy.filter(game => game.createdInDb)
        if (action.payload === "api") originFiltered = allVideogamesCopy.filter(game => !game.createdInDb)

            return {
                ...state,
                allVideogames: originFiltered
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