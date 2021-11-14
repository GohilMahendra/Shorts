
import firestore, { firebase } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { GET_USER_DETAILS_FAILED, GET_USER_DETAILS_REQUEST, GET_USER_DETAILS_SUCCESS, GET_USER_VIDEOS_FAILED, GET_USER_VIDEOS_REQUEST, GET_USER_VIDEOS_SUCCESS } from "../Types/ProfileTypes";
import { GET_SONG_DETAILS_FAILED, GET_SONG_DETAILS_REQUEST, GET_SONG_DETAILS_SUCCESS, GET_SONG_VIDEOS_FAILED, GET_SONG_VIDEOS_REQUEST, GET_SONG_VIDEOS_SUCCESS } from "../Types/SongTypes";
const MAX_FETCH_LIMIT = 1

export const getSongDetails = (songID) => {

    return async (dispatch, getState) => {
        try {
            // dispatch(
            //     {
            //         type: GET_SONG_DETAILS_REQUEST
            //     }
            // )
            const song = await
                firestore()
                    .collection('Songs')
                    .doc(
                       songID
                    )
                    .get()


            const data ={ id:song.id,...song.data()}
            dispatch(
                {
                    type: GET_SONG_DETAILS_SUCCESS,
                    payload: {
                        songDetails: data
                    }
                }
            )

        }

        catch (err) {

            console.log(err)
            dispatch(
                {
                    type: GET_SONG_DETAILS_FAILED,
                    payload: err
                }
            )
        }

    }


}


export const getSongVideos = (songID) => {

    return async (dispatch) => {
        try {
            dispatch(
                {
                    type: GET_SONG_VIDEOS_REQUEST
                }
            )
            const videos =
                await firestore()
                    .collection('Videos')
                    .where('songID', '==', songID)
                    .limit(10)
                    .get()
console.log(videos,"Actopn")
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
                    type: GET_SONG_VIDEOS_SUCCESS,
                    payload: {
                        Videos: list,
                        lastKey: lastKey
                    }
                }
            )

        }
        catch (err) {

            console.log(err)
            dispatch(
                {
                    type: GET_SONG_VIDEOS_FAILED,
                    payload: err
                }
            )
            


        }
    }

}
