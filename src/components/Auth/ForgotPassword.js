import React ,{useState}from "react"
import { StyleSheet,View,TextInput, Text} from "react-native"
import {
    TouchableOpacity
} from 'react-native-gesture-handler'


import auth from '@react-native-firebase/auth'

const ForgotPassword=(

)=>
{


    const [email,setemail]=useState("")



    const sendPasswordChangeLink=async()=>
    {


        console.log(auth().currentUser)
        const mrthods=await auth().sendPasswordResetEmail(email)


        console.log(mrthods)

    }

    return(
        <View
            style={{
                height:'30%',
                width:'90%',
                alignSelf:'center',
                borderRadius:30,
                position:'absolute',
                top:'30%',
                backgroundColor:"#de5d83",
                alignItems:'center'
            }}
            >

                <Text
                style={
                    {
                        padding:5,
                        backgroundColor:'black',
                        color:"#fff"
                    }
                }
                >
                    ENTER EMAIL FOR SEND FORGOT LINK
                </Text>

               <TextInput
               value={email}
               onChangeText={(text)=>setemail(text)}
               style={[styles.textInput,{width:'100%',backgroundColor:'black',marginHorizontal:20}]}
               >

               </TextInput>

                <TouchableOpacity
                style={
                    {
                        backgroundColor:"blue",
                        height:50,
                        borderRadius:15,
                        justifyContent:'center',
                        padding:10,
                    }
                }
                onPress={()=>sendPasswordChangeLink()}
                >
                    <Text
                    style={{
                        color:"#fff"
                    }}
                    >SEND LINK</Text>
                </TouchableOpacity>
            
            </View>
    )
}

const styles=StyleSheet.create(
    {
        textInput:
        {

            color: '#fff',
            backgroundColor: "#282C35",
            height: 50,
            textAlign:'center',
            marginVertical: 10,
            marginHorizontal:20,
            padding:10,
            borderRadius: 15

        },
    }
)
export default ForgotPassword