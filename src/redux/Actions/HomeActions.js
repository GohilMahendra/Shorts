import firestore, { firebase } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { GET_HOME_FEED_VIDEOS_FAILED, GET_HOME_FEED_VIDEOS_REQUEST, GET_HOME_FEED_VIDEOS_SUCCESS, GET_MORE_HOME_FEED_VIDEOS_FAILED, GET_MORE_HOME_FEED_VIDEOS_REQUEST, GET_MORE_HOME_FEED_VIDEOS_SUCCESS } from "../Types/HomeFeedTypes";
import { indigo100 } from "react-native-paper/lib/typescript/styles/colors";
const MAX_FETCH_LIMIT = 1

export const getHomeFeedVideos = (following=false) => {
    return async (dispatch) => {
        try {

            dispatch(
                {
                    type: GET_HOME_FEED_VIDEOS_REQUEST
                }
            )


            let qry=null

            if(following)
            {


                console.log('following logic')
                const followingList=await firestore()
                                    .collection('Following')
                                    .doc(auth().currentUser.uid)
                                    .collection('LookUps')
                                    .limit(10)
                                    .get()
                

                let followinngUsers=[]
                followingList.docs.forEach
                (
                    function(child)
                    {
                       followinngUsers.push(child.id)
                    }
                )
                 
            
                    qry=firestore()
                        .collection('Videos')
                        .where('channelID','in',followinngUsers)
                        .limit(MAX_FETCH_LIMIT)
                       
            
            }
            else
            {
                qry= firestore()
                    .collection('Videos')
                    .limit(MAX_FETCH_LIMIT)

            }

            

            const videos = await qry.get()

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
                    type: GET_HOME_FEED_VIDEOS_SUCCESS,
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
                    type: GET_HOME_FEED_VIDEOS_FAILED,
                    payload: err
                }
            )

        }
    }

}


export const getMoreFeedVideos = (following=false) => {

    return async (dispatch, getState) => {

        try {
            const id = getState().Home.lastKeyHomeVideos
            //console.log(id)

            if (id == null)
                return

            dispatch(
                {
                    type: GET_MORE_HOME_FEED_VIDEOS_REQUEST
                }
            )

            let qry=null

            if(following)
            {

                const followingList=await firestore()
                                    .collection('Following')
                                    .doc(auth().currentUser.uid)
                                    .collection('LookUps')
                                    .limit(10)
                                    .get()
                

                let followinngUsers=[]
                followingList.docs.forEach
                (
                    function(child)
                    {
                       followinngUsers.push(child.id)
                    }
                )
                 
            
                    qry=firestore()
                        .collection('Videos')
                        .where('channelID','in',followinngUsers)
                        .orderBy(firestore.FieldPath.documentId())
                        .startAfter(id)
                        .limit(MAX_FETCH_LIMIT)
                       
            
            }
            else
            {
                qry= firestore()
                    .collection('Videos')
                    .orderBy(firestore.FieldPath.documentId())
                    .startAfter(id)
                    .limit(MAX_FETCH_LIMIT)

            }

            const videos = await qry.get()

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

            console.log(list)

            dispatch(
                {
                    type: GET_MORE_HOME_FEED_VIDEOS_SUCCESS,
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
                    type: GET_MORE_HOME_FEED_VIDEOS_FAILED,
                    payload: err
                }

            )
        }


    }

}
