





const initialstate={


    comments:[],
    
    commentsLoad:false,
    commentsLoadError:null,



    commentsMoreLoad:false,
    commentsMoreLoadError:null,


    lastKeyComments:null,

}


const CommentReducer=(state=initialstate,action)=>
{

    switch(action.type)
    {

    default:
        return state

    }

}

export default CommentReducer