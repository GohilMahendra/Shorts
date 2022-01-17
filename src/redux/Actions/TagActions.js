


import React from "react";

import firestore from "@react-native-firebase/firestore";
import { FETCH_MORE_VIDEO_Tags_FAILED, FETCH_MORE_VIDEO_Tags_REQUEST, FETCH_VIDEO_Tags_FAILED, FETCH_VIDEO_Tags_REQUEST, FETCH_VIDEO_Tags_SUCCESS } from "../Types/TagTypes";

const MAX_FETCH_LIMIT = 10

export const getTagVideos = (tags) => {

    return async (dispatch, getState) => {

        try {

            dispatch({ type: FETCH_VIDEO_Tags_REQUEST })

            const userVideos = await
                firestore()
                    .collection(
                        'Videos'
                    )
                    .where('Tags', 'array-contains', tags)
                    .limit(MAX_FETCH_LIMIT)
                    .get()

            let list = []

            userVideos.docs.forEach
                (
                    function (child) {
                        list.push({ id: child.id, ...child.data() })
                    }
                )


            let lastKey = null

            if (list.length >= MAX_FETCH_LIMIT) {
                lastKey = list[list.length - 1].id
            }


            console.log(lastKey)

            dispatch(
                {
                    type: FETCH_VIDEO_Tags_SUCCESS,
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
                    type: FETCH_VIDEO_Tags_FAILED,
                    payload: err
                }
            )


        }

    }

}

export const getMoreTagVideos = () => {

    return async (dispatch, getState) => {



        try {

            const id = getState().Tags.lastKeyTagVideos
            if (id == null)
                return

            dispatch({ type: FETCH_MORE_VIDEO_Tags_REQUEST })

            const userVideos = await
                firestore()
                    .collection(
                        'Videos')
                    .where('Tags', 'array-contains', tags)
                    .orderBy(firestore.FieldPath.documentId())
                    .startAfter(id)
                    .limit(MAX_FETCH_LIMIT)
                    .get()

            let list = []

            userVideos.docs.forEach
                (
                    function (child) {
                        list.push({ id: child.id, ...child.data() })
                    }
                )


            let lastKey = null

            if (list.length >= MAX_FETCH_LIMIT) {
                lastKey = list[list.length - 1].id
            }


            console.log(lastKey)

            dispatch(
                {
                    type: FETCH_MORE_VIDEO_Tags_SUCCESS,
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
                    type: FETCH_MORE_VIDEO_Tags_FAILED,
                    payload: err
                }
            )
        }

    }


}
