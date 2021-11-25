

import firestore,{ firebase } from "@react-native-firebase/firestore"
import auth from '@react-native-firebase/auth'
export const followOperations = async (createrID) => {
    try {
        let follow1 = await firestore()
            .collection('Following').
            doc(auth().currentUser.uid)
            .collection('LookUps')
            .doc(createrID)
            .set(
                {

                }
            )

        let follow2 = await firestore()
            .collection('Followers')
            .doc(createrID)
            .collection('Lookups')
            .doc(auth().currentUser.uid)
            .set(
                {

                }
            )

        let increaseFollowerFromCreater = await
            firestore()
                .collection('Users')
                .doc(createrID)
                .update
                (
                    {
                        Followers: firebase
                            .firestore
                            .FieldValue
                            .increment(1)
                    }
                )

        let increaseFollowingFromUser = await
            firestore()
                .collection('Users')
                .doc(auth().currentUser.uid)
                .update
                (
                    {
                        Following: firebase
                            .firestore
                            .FieldValue
                            .increment(1)
                    }
                )


        return { follow1, follow2, increaseFollowerFromCreater, increaseFollowingFromUser }

    }
    catch (err) {
        console.log(err, "error while Triggering Follow")
    }
}


export const unFollowOperations = async (createrID) => {
    try {

        let del1 = await firestore()
            .collection('Following').
            doc(auth().currentUser.uid)
            .collection('LookUps')
            .doc(createrID)
            .delete()

        let del2 = await firestore()
            .collection('Followers')
            .doc(createrID)
            .collection('Lookups')
            .doc(auth().currentUser.uid)
            .delete()

        let decreseFollowerFromCreater = await
            firestore()
                .collection('Users')
                .doc(createrID)
                .update
                (
                    {
                        Followers: firebase
                            .firestore
                            .FieldValue
                            .increment(-1)
                    }
                )

        let decreaseFollowingFromUser = await
            firestore()
                .collection('Users')
                .doc(auth().currentUser.uid)
                .update
                (
                    {
                        Following: firebase
                            .firestore
                            .FieldValue
                            .increment(-1)
                    }
                )


        return {
            decreaseFollowingFromUser, decreseFollowerFromCreater
            , del1, del2
        }

    }
    catch
    (err) {

        console.log(err, "error while Triggering Unfollow")
    }

}
