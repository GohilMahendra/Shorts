




import { SEARCH_POST_FAILED, SEARCH_POST_REQUEST, SEARCH_POST_SUCCESS }
    
        from '../Types/SearchTypes'
    
    const initialstate = {
    
    
        searchResults:[],

    
    }
    
    
    const SearchReducer = (state = initialstate, action) => {
    
        switch (action.type) {
    

            case SEARCH_POST_REQUEST:
                return {
                    ...state,searchResults:[]
                }
            case SEARCH_POST_SUCCESS:
                return {
                    ...state,searchResults:action.payload.result
                }
            case SEARCH_POST_FAILED:
                return {
                    ...state
                }
            default:
                return state
    
        }
    
    }
    
    export default SearchReducer