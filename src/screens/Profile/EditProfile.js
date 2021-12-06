
import React
, { useContext,
useState }
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
import { useDispatch, useSelector } from "react-redux"
import { stat } from "react-native-fs"
import { updateUserData } from "../../redux/Actions/ProfileActions"
import { ActivityIndicator } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { themes } from "../../constants/themes"
import { themeContext } from "../../../App"

const EditProfile = () => {


    const [userName, setuserName] = useState(auth().currentUser.displayName)
    const [path, setpath] = useState("")

    const {theme,settheme}=useContext(themeContext)
    const dispatch = useDispatch()
    const updateProfileLoading = useSelector(state => state.Profile.updateProfileLoading)
    const updateProfileError = useSelector(state => state.Profile.updateProfileError)

    console.log(updateProfileLoading, updateProfileError)
    const update = async () => {

        dispatch(updateUserData(userName, path))


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
                
                {
                    updateProfileLoading ?
                        <ActivityIndicator
                            size={25}
                            color='#fff'


                        /> :
                        <Text
                            style={styles.txtUpdate}
                        >
                            UPDATE PROFILE
                        </Text>
                }
            </TouchableOpacity>
          {updateProfileError!=null &&  <View style={styles.errorContainer}>
                <Text style={styles.txtError}>error while updating Profile Try Again !!!</Text>
            </View>}

            <View
            
         
            style={
                {
                    marginVertical:20
                }
            }
            >
                <Text style={styles.txtUserName}>SELECT THEME</Text>

              
              <View style={styles.rowContainer}>
                <TouchableOpacity
                onPress={()=>settheme(themes[0])}
                style={styles.btnTheme}
                >
                    
                    <LinearGradient
                    style={styles.gradientTheme}
                    colors={[themes[0].gradient_color1,themes[0].gradient_color2]}
                    >

                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>settheme(themes[1])}
                style={styles.btnTheme}
                >
                    
                    <LinearGradient
                    style={styles.gradientTheme}
                    colors={[themes[1].gradient_color1,themes[1].gradient_color2]}
                    >

                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>settheme(themes[2])}
                style={styles.btnTheme}
                >
                    
                    <LinearGradient
                    style={styles.gradientTheme}
                    colors={[themes[2].gradient_color1,themes[2].gradient_color2]}
                    >

                    </LinearGradient>
                </TouchableOpacity>
                </View>
            </View>
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
            btnTheme:
            {
                height:50,
                width:100,
                margin:10,
               // margin:20,
                borderRadius:15,
            },
            gradientTheme:
            {
                flex:1,
                borderRadius:15
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
            errorContainer:
            {
                height: 50,
            
                margin: 10,
                padding:10,
                borderRadius: 15,
                backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center'

            },
            rowContainer:
            {
                flexDirection:'row',
                alignItems:'center'
                ,
                justifyContent:'space-around'

            },
            txtError:
            {
                color: '#fff'
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
