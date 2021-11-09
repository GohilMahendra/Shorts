
import firestore, { firebase } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { SEARCH_POST_FAILED, SEARCH_POST_REQUEST, SEARCH_POST_SUCCESS } from "../Types/SearchTypes";
import { ADD_COMMENTS_FAILED } from "../Types/CommentTypes";
const MAX_FETCH_LIMIT = 10

export const SearchUser = (search) => {

    return async (dispatch, getState) => {
        try {
            dispatch(
                {
                    type: SEARCH_POST_REQUEST
                }
            )
            const result = await
                firestore()
                    .collection('Users')
                    .where('userName','>=',search)
                    .where('userName','<=',search+'\uf8ff')
                    .limit(MAX_FETCH_LIMIT)
                    .get()

        
            let post=[]
            result.docs.forEach
            (
                function(child)
                {
                    post.push({id:child.id,...child.data()})
                    
                }
            )


            dispatch(
                {
                    type:SEARCH_POST_SUCCESS,
                    payload:
                    {
                        result:post
                    }
                }
            )

                



        }

        catch (err) {

            dispatch(
                {
                    type: SEARCH_POST_FAILED,
                    payload: err
                }
            )
        }

    }


}

