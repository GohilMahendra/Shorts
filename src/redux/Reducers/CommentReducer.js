





import {

ADD_COMMENTS_FAILED,
ADD_COMMENTS_REQUEST,
ADD_COMMENTS_SUCCESS,
FETCH_COMMENTS_FAILED,
FETCH_COMMENTS_REQUEST,
FETCH_COMMENTS_SUCCESS
}

    from '../Types/CommentTypes'

const initialstate = {


    comments: [],

    commentsLoad: false,
    commentsLoadError: null,
    commentsMoreLoad: false,
    commentsMoreLoadError: null,
    
    lastKeyComments: null,

}


const CommentReducer = (state = initialstate, action) => {

    switch (action.type) {

        case ADD_COMMENTS_REQUEST:
            return { ...state }
        case ADD_COMMENTS_SUCCESS:
            return { ...state }
        case ADD_COMMENTS_FAILED:
            return { ...state }

        case FETCH_COMMENTS_REQUEST:
            return {
                ...state,
                commentsLoad: true,
                commentsLoadError: null
            }
        case FETCH_COMMENTS_SUCCESS:

            return {
                ...state,
                lastKeyComments: action.payload.lastkey
                , commentsLoad: false
                , comments: action.payload.data
            }
        case FETCH_COMMENTS_FAILED:
            return {
                ...state, commentsLoad: false,
                commentsLoadError: action.payload
            }



        default:
            return state

    }

}

export default CommentReducer