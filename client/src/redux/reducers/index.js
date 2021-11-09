
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
            return {
                ...state,
                videogameDetails: [action.payload]
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

        case "FILTER_BY":
            const copyForFilter = [...state.videogames]
            let filteredBy

            switch (action.payload) {
                case "all": filteredBy = copyForFilter; break;
                case "user": filteredBy = copyForFilter.filter(game => game.createdInDb); break;
                case "api": filteredBy = copyForFilter.filter(game => !game.createdInDb); break;
                default: filteredBy = copyForFilter.filter(game => game.genres.some(el => el.name === action.payload)); break;
            }
            return {
                ...state,
                allVideogames: filteredBy.length === 0 ? "Not Found" : filteredBy
            };

        //------------------------------------------------------------------

        case "ORDER_BY":
            const copyForSort = [...state.videogames]
            let orderedBy
            switch (action.payload) {
                case "alph-asc":
                    orderedBy = copyForSort.sort((a, b) => {
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) return -1;
                        return 0;
                    })
                    break;
                case "alph-desc":
                    orderedBy = copyForSort.sort((a, b) => {
                        if (a.name > b.name) return -1;
                        if (a.name < b.name) return 1;
                        return 0;
                    })
                    break;
                case "rat-asc":
                    orderedBy = copyForSort.sort((a, b) => {
                        if (a.rating > b.rating) return 1;
                        if (a.rating < b.rating) return -1;
                        return 0;
                    })
                    break;
                case "rat-desc":
                    orderedBy = copyForSort.sort((a, b) => {
                        if (a.rating > b.rating) return -1;
                        if (a.rating < b.rating) return 1;
                        return 0;
                    })
                    break;
                default: return {
                    ...state,
                    allVideogames: copyForSort
                }
            }
            return {
                ...state,
                allVideogames: orderedBy
            };

        //-------------------------------------------------------------------
        default: return state
    }
}