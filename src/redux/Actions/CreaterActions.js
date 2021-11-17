
import firestore, { firebase } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { GET_CREATER_DETAILS_FAILED, GET_CREATER_DETAILS_REQUEST, GET_CREATER_DETAILS_SUCCESS, GET_CREATER_VIDEOS_FAILED, GET_CREATER_VIDEOS_REQUEST, GET_CREATER_VIDEOS_SUCCESS } from "../Types/CreaterTypes";
const MAX_FETCH_LIMIT = 1

export const getCreaterDetails = (createrID) => {

    return async (dispatch, getState) => {
        try {
            dispatch(
                {
                    type: GET_CREATER_DETAILS_REQUEST
                }
            )
            const creater = await
                firestore()
                    .collection('Users')
                    .doc(
                     createrID
                    )
                    .get()


              //     console.log(creater,"creater Action")

           const data = {id:creater.id,
            
                CreaterName:creater.data().userName ,
                CreaterID: creater.data().userID,
                photoURL:creater.data().photoURL ,
                varified: creater.data().varified,
                Following: creater.data().Following,
                Followers: creater.data().Followers,
                likes: creater.data().likes,


            }

          //  console.log(data,"data")
            dispatch(
                {
                    type: GET_CREATER_DETAILS_SUCCESS,
                    payload: {
                        Creater: data
                    }
                }
            )

        }

        catch (err) {

            console.log(err)
            dispatch(
                {
                    type: GET_CREATER_DETAILS_FAILED,
                    payload: err
                }
            )
        }

    }


}


export const getCreaterVideos = (createrID) => {

    return async (dispatch) => {
        try {
            dispatch(
                {
                    type: GET_CREATER_VIDEOS_REQUEST
                }
            )
            const videos =
                await firestore().collection('Videos')
                    .where('channelID', '==', createrID)
                    .limit(10)
                    .get()

            let list = []


            videos.docs.forEach
                (
                    function (child) {
                        list.push(
                            {
                                id: child.id,
                                ...child.data()
                            }
                        )
                    }
                )


            let lastKey = null

            if (list.length >= MAX_FETCH_LIMIT) {
                lastKey = list[list.length - 1].id
            }


            dispatch(
                {
                    type: GET_CREATER_VIDEOS_SUCCESS,
                    payload: {
                        Videos: list,
                        lastKey: lastKey
                    }
                }
            )

        }
        catch (err) {

            dispatch(
                {
                    type: GET_CREATER_VIDEOS_FAILED,
                    payload: err
                }
            )


        }
    }

}
