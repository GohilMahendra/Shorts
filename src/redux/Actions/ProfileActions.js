
import firestore, { firebase } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { GET_USER_DETAILS_FAILED, GET_USER_DETAILS_REQUEST, GET_USER_DETAILS_SUCCESS, GET_USER_VIDEOS_FAILED, GET_USER_VIDEOS_REQUEST, GET_USER_VIDEOS_SUCCESS } from "../Types/ProfileTypes";
const MAX_FETCH_LIMIT = 1

export const getProfileDetails = () => {

    return async (dispatch, getState) => {
        try {
            dispatch(
                {
                    type: GET_USER_DETAILS_REQUEST
                }
            )
            const user = await
                firestore()
                    .collection('Users')
                    .doc(
                        auth().currentUser.uid
                    )
                    .get()


            const data = user.data()
            dispatch(
                {
                    type: GET_USER_DETAILS_SUCCESS,
                    payload: {
                        user: data
                    }
                }
            )

        }

        catch (err) {

            dispatch(
                {
                    type: GET_USER_DETAILS_FAILED,
                    payload: err
                }
            )
        }

    }


}


export const getProfileVideos = () => {

    return async (dispatch) => {
        try {
            dispatch(
                {
                    type: GET_USER_VIDEOS_REQUEST
                }
            )
            const videos =
                await firestore().collection('Videos')
                    .where('channelID', '==', auth().currentUser.uid)
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
                    type: GET_USER_VIDEOS_SUCCESS,
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
                    type: GET_USER_VIDEOS_FAILED,
                    payload: err
                }
            )


        }
    }

}