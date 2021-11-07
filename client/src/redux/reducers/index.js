
const initialState = {
    videogameDetails: [],
    videogames: [],
    allVideogames: [],
    allGenres: [],
    allPlatforms: [],
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {

        case "GET_ALL_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            };

        //------------------------------------------------------------------

        case "GET_ALL_GENRES":
            return {
                ...state,
                allGenres: action.payload
            };

        //------------------------------------------------------------------

        case "GET_ALL_PLATFORMS":
            return {
                ...state,
                allPlatforms: action.payload
            };

        //------------------------------------------------------------------

        case "GET_VIDEOGAME_DETAIL":
            const videogameFromDbDetails = state.videogames.find(videogame => videogame.id.toString() === action.id);
            return {
                ...state,
                videogameDetails: action.id.length > 6 ? [videogameFromDbDetails] : [action.payload]
            };


        //------------------------------------------------------------------

        case "SEARCH_BY_NAME":
            return {
                ...state,
                allVideogames: action.payload
            }

        //------------------------------------------------------------------

        case "POST_NEW_VIDEOGAME":
            return {
                ...state
            }

        //------------------------------------------------------------------

        case "FILTER_BY_GENRE":
            let filteredByGenre = []
            if (action.payload === "all") filteredByGenre = state.allVideogames
            else filteredByGenre = [...state.videogames].filter(game => game.genres.some(el => el.name === action.payload))

            return {
                ...state,
                allVideogames: filteredByGenre.length === 0 ? "Not Found" : filteredByGenre
            };

        // //-------------------------------------------------------------------

        case "FILTER_BY_ORIGIN":
            let filteredByOrigin = [...state.videogames]
            if (action.payload === "user") filteredByOrigin = [...state.videogames].filter(game => game.createdInDb)
            if (action.payload === "api") filteredByOrigin = [...state.videogames].filter(game => !game.createdInDb)

            return {
                ...state,
                allVideogames: filteredByOrigin
            };

        //------------------------------------------------------------------

        // case "FILTER_BY":
        //     let filteredBy = []
        //     if (action.payload === "all") filteredBy = [...state.videogames]
        //     if (action.payload === "user") filteredBy = [...state.videogames].filter(game => game.createdInDb)
        //     if (action.payload === "api") filteredBy = [...state.videogames].filter(game => !game.createdInDb)
        //     else filteredBy = [...state.videogames].filter(game => game.genres.some(el => el.name === action.payload))

        //     return {
        //         ...state,
        //         allVideogames: filteredBy
        //     };

        //------------------------------------------------------------------

        case "ORDER_BY":
            const videogamesCopy = [...state.allVideogames]
            let orderedBy
            switch (action.payload) {
                case "alph-asc":
                    orderedBy = videogamesCopy.sort((a, b) => {
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) return -1;
                        return 0;
                    })
                    break;
                case "alph-desc":
                    orderedBy = videogamesCopy.sort((a, b) => {
                        if (a.name > b.name) return -1;
                        if (a.name < b.name) return 1;
                        return 0;
                    })
                    break;
                case "rat-asc":
                    orderedBy = videogamesCopy.sort((a, b) => {
                        if (a.rating > b.rating) return 1;
                        if (a.rating < b.rating) return -1;
                        return 0;
                    })
                    break;
                case "rat-desc":
                    orderedBy = videogamesCopy.sort((a, b) => {
                        if (a.rating > b.rating) return -1;
                        if (a.rating < b.rating) return 1;
                        return 0;
                    })
                    break;
                default: orderedBy = videogamesCopy
            }

            return {
                ...state,
                allVideogames: orderedBy
            };

        //-------------------------------------------------------------------
        default: return state
    }
}