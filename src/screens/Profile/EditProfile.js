
import React
, { useState }
    from "react"

import {
    View,
    Text,
    StyleSheet,
    TextInput,

} from 'react-native'


import auth from '@react-native-firebase/auth'
import { Colors } from "../../constants/colors"
import RoundImage from "../../components/RoundImage"
import { TouchableOpacity } from "react-native-gesture-handler"

import {
    launchImageLibrary
} from 'react-native-image-picker'
import { firebase } from "@react-native-firebase/firestore"


import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

const EditProfile = () => {


    const [userName, setuserName] = useState(auth().currentUser.displayName)
    const [path, setpath] = useState("")

    const [loading, setloading] = useState(false)

    const update = async () => {

        try {

            const changeUser = await firestore().collection('Users').doc(
                auth().currentUser.uid
            ).update
                (
                    {
                        userName: userName
                    }
                )

            const changeAuth = await auth().currentUser.updateProfile(
                {
                    displayName: userName
                }
            )


        }
        catch (err) {
            console.log(err)
        }




        if (path != "")
            await changeImageFromDatabase(path)
        else
            setloading(false)
    }

    const ChangeImageData = async (newUrl) => {


        try {

            const changeUser = await firestore().collection('Users').doc(
                auth().currentUser.uid
            ).update
                (
                    {
                        photoURL: newUrl
                    }
                )

            const changeAuth = await auth().currentUser.updateProfile(
                {
                    photoURL: newUrl
                }
            )


            setloading(false)
            console.log(changeAuth, changeUser)

        }
        catch (err) {
            console.log(err)
        }


    }


    const changeImageFromDatabase = async (uri) => {

        try {


            const path = 'Profile/' + auth().currentUser.uid + '/' + auth().currentUser.uid

            let ref = storage().ref(path)

            let task = await ref.putFile(uri)

            console.log(task)
            let storagepath = await ref.getDownloadURL()



            await ChangeImageData(storagepath)

        }
        catch (err) {
            console.log(err)
        }

    }

    const chooseImage = async () => {
        launchImageLibrary(
            {

                mediaType: 'mixed',
                selectionLimit: 1,

                quality: 0.5,
                includeBase64: false
            },

            response => {
                if (response.didCancel) {
                    console.log('cancel')
                }
                else if (!response.didCancel) {
                    setpath(response.assets[0].uri)
                }

            }
        )
    }


    return (
        <View
            style={styles.Container}
        >

            <View
                style={
                    {
                        marginTop: 20
                    }
                }
            >
                <RoundImage
                    imageURL={auth().currentUser.photoURL}
                />

            </View>

            <TouchableOpacity


                style={styles.BtnProfile}

                onPress={
                    () => chooseImage()
                }
            >
                <Text
                    style={styles.txtProfilePicture}
                >Change Profile Picture</Text>
            </TouchableOpacity>
            <View
                style={styles.userNameContainer}
            >
                <Text
                    style={styles.txtUserName}
                >USER NAME</Text>
                <TextInput
                    value={userName}

                    onChangeText={text => setuserName(text)}
                    style={styles.textInput}

                >

                </TextInput>
            </View>

            <TouchableOpacity

                onPress={() => update()}
                style={styles.btnUpdate}
            >
                <Text
                    style={styles.txtUpdate}
                >
                    UPDATE PROFILE
                </Text>
            </TouchableOpacity>
        </View>
    )

}

export default EditProfile

const styles = StyleSheet.create
    (
        {
            Container:
            {
                flex: 1,

                backgroundColor: 'black',
                alignItems: "center",

            },
            textInput:
            {
                backgroundColor: Colors.White,
                flex: 1,

                height: 50,
                marginHorizontal: 20,
                borderRadius: 15,
                textAlign: 'center',
                color: 'black'
            },
            BtnProfile:

            {
                backgroundColor: '#EBF0F6',
                alignItems: 'center',
                alignSelf: 'center',
                padding: 10,
                margin: 20,
                borderRadius: 15,
                elevation: 15
            },
            txtProfilePicture:
            {
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black'
            },
            userNameContainer:
            {
                margin: 20,
                borderRadius: 20,
                height: 100,

                width: '100%',
                justifyContent: 'center'

            },
            txtUserName:
            {

                textAlign: 'center',
                textAlignVertical: 'center',
                color: Colors.White,
                fontSize: 20,
                margin: 10

            },
            btnUpdate:
            {
                backgroundColor: '#77ACF1',
                height: 50,
                elevation: 10,
                justifyContent: "center",
                padding: 10,
                borderRadius: 15
            },
            txtUpdate:
            {
                color: Colors.White,
                fontSize: 20,
                textAlign: 'center',
                justifyContent: "center"
            }



        }
    )
