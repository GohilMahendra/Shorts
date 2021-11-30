
import firestore, { firebase } from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
export const Dislike = async (videoID, channelID) => {



    try {
        const deleteFromlookup = await firestore()
            .collection('Likes')
            .doc(videoID)
            .collection('lookups')
            .doc(auth().currentUser.uid)
            .delete()

        const removelikefromVideo = await firestore()
            .collection('Videos')
            .doc(videoID)
            .update
            (
                {
                    likes: firebase
                        .firestore
                        .FieldValue
                        .increment(-1)
                }
            )

        const removeLikeFromCretater = await firestore()
            .collection('Users')
            .doc(channelID)
            .update
            (
                {
                    likes: firebase
                        .firestore
                        .FieldValue
                        .increment(-1)
                }
            )


    }
    catch (err) {
        console.log(err)
    }
}




export const LikeVideo = async (videoID, channelID) => {



    try {
        const addTOLookup = await firestore()
            .collection('Likes')
            .doc(videoID)
            .collection('lookups')
            .doc(auth().currentUser.uid)
            .set({})

        const addLikeTOVideo = await firestore()
            .collection('Videos')
            .doc(videoID)
            .update
            (
                {
                    likes: firebase
                        .firestore
                        .FieldValue
                        .increment(1)
                }
            )

        const addLikeTOCretater = await firestore()
            .collection('Users')
            .doc(channelID)
            .update
            (
                {
                    likes: firebase
                        .firestore
                        .FieldValue
                        .increment(1)
                }
            )


    }
    catch (err) {
        console.log(err)
    }
}


export const isExist = async (videoID) => {

    try {
        const res = await firestore()
            .collection('Likes')
            .doc(videoID)
            .collection('lookups')
            .doc(auth().currentUser.uid)
            .get()


        return res.exists
    }
    catch (err) {
        console.log(err)
    }
}