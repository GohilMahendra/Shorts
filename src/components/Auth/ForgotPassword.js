import React, { useState } from "react"
import { StyleSheet, View,TouchableOpacity, TextInput, Text, ActivityIndicator } from "react-native"


import auth from '@react-native-firebase/auth'
import { useDispatch, useSelector } from "react-redux"
import { sendResetPasswordLink } from "../../redux/Actions/ProfileActions"

const ForgotPassword = (props) => {


    const [email, setemail] = useState("")

    const {onPress}=props
    const resetPasswordLoading = useSelector(state => state.Profile.resetPasswordLoading)
    const resetPasswordError = useSelector(state => state.Profile.resetPasswordError)

    const dispatch = useDispatch()
    const sendPasswordChangeLink = async () => {

        if (email != "" && email != null) {

            dispatch(sendResetPasswordLink(email))
        }
    }
   
    return (
        <View
            style={styles.Container}
        >

            <TouchableOpacity
                onPress={()=>onPress()}
                style={styles.btnClose}
            >
                <Text
                    style={styles.txtClose}
                >X</Text>
            </TouchableOpacity>
            <Text
                style={styles.txtHeader}
            >
                ENTER EMAIL FOR SEND FORGOT LINK
            </Text>

            <TextInput
                value={email}
                placeholder="Enter email ......"
                onChangeText={(text) => setemail(text)}
                style={[styles.textInput, { width: '100%', backgroundColor: '#fff', elevation: 10 }]}
            >

            </TextInput>

            <TouchableOpacity
        

               // disabled={resetPasswordLoading?true:false}
                style={styles.btnSend}
                onPress={() => sendPasswordChangeLink()}
            >
               {
                   resetPasswordLoading?
                  <ActivityIndicator
                  size={25}
                  color="#fff"
                  />:
                  <Text
                  style={styles.txtBtnSend}
              >SEND LINK</Text>
               }
            </TouchableOpacity>

           {resetPasswordError!=null && <View
                style={styles.errorView}
            >
                <Text
                    style={styles.txtError}
                >ERROR IN SENDING LINK PLEASE TRY AGAIN</Text>
            </View>}

        </View>
    )
}

const styles = StyleSheet.create(
    {
        Container:
        {
            height: '70%',

            width: '100%',
            alignSelf: 'center',
            borderRadius: 15,
            position: 'absolute',
            top: '10%',
            backgroundColor: "white",
            // justifyContent:'center',
            //alignItems:'center'
        },
        textInput:
        {

            color: '#fff',
            backgroundColor: "#282C35",
            height: 50,
            color:"black",
            textAlign: 'center',
            marginVertical: 10,
            padding: 10,
            borderRadius: 15

        },
        btnClose:
        {
            margin: 20,

            alignSelf: "flex-end",
        },

        btnSend:

        {
            backgroundColor: "blue",
            height: 50,
            elevation: 10,
            marginVertical: 10,
            borderRadius: 10,
            justifyContent: 'center',
            padding: 10,
            alignSelf: 'center',
            alignItems: 'center',
            width: '80%'
        },
        txtHeader:
        {
            padding: 5,
            fontSize: 15,
            margin: 20,
            alignSelf: 'center'

        },
        txtClose:
        {
            fontSize: 20,
            fontWeight: 'bold',

        },
        errorView:
        {
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: 'center',
            padding: 10,
            borderRadius: 15,
            margin: 10
        },
        txtError:
        {
            color: '#fff'
        },

        txtBtnSend:
        {
            color: "#fff"
        }




    }
)
export default ForgotPassword