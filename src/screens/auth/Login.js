
import React,{useEffect, useState} from "react"

import { StyleSheet, Text, View } from "react-native"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import auth from "@react-native-firebase/auth"
import ForgotPassword from "../../components/Auth/ForgotPassword"


import firestore from "@react-native-firebase/firestore";
import { useValue } from "react-native-reanimated"
import { useSelector } from "react-redux"
const Login = ({navigation}) => {

    const [email,setEmail]=useState()
    const [password,setPassword]=useState()

    const [passwordForgot,setPasswordForgot]=useState(false)

    useEffect
    (
        ()=>
        {
            

            const subscription=auth().onAuthStateChanged
            (
                (user)=>
                {
                
                    console.log(user)
                   
                    if(user!=null)
                    {
                        navigation.navigate("HomeTabs")
                    }
                }
            )

            return ()=>subscription()
        },

        []
    )
    const onSignIn=async()=>
    {
        const user=await auth().signInWithEmailAndPassword(email,password)


      
        if(user)
        {
            navigation.navigate('HomeTabs')
        }
    }
    return (

        <View style={styles.Container}>



    
            <View style={styles.greetingsContainer}>
            <Text
                style={styles.greetings}
            >WELCOME</Text>
            
            <Text
                style={styles.greetingsSupportingText}
            >Sign In Here</Text>
            </View>
            <TextInput
                value={email}
                onChangeText={(text)=>setEmail(text)}
                clearButtonMode={"always"}
                placeholderTextColor="#fff"
                maxLength={50}
                textContentType="emailAddress"
                placeholder="Email.."

                style={styles.textInput}
            >

            </TextInput>
            <TextInput
               value={password}
               onChangeText={(text)=>setPassword(text)}
                maxLength={50}
                placeholderTextColor="#fff"
                placeholder="Password"
                textContentType="password"
                passwordRules="required: upper; 
                required: lower;
                required: digit;
                max-consecutive: 2;
                minlength: 8;"
                style={styles.textInput}
            >

            </TextInput>




            <TouchableOpacity
                onPress={()=>onSignIn()}
                style={styles.btnContainer}
            >

                <Text
                    style={styles.btnText}
                >Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>setPasswordForgot(true)}
            >
            <Text style={[styles.signuptext,{marginHorizontal:20,
                marginTop:10,alignSelf:'center'}]}>
                    FORGOT PASSWORD ?</Text>
            </TouchableOpacity>
            <View
            style={styles.signupContainer}
            >
                <Text style={styles.signuptext}>
                    DONT HAVE ACCOUNT YET?</Text>
                <TouchableOpacity
                onPress={()=>navigation.navigate('SignUp')}
                >
                    <Text style={styles.signupbtn}>Sign Up here!</Text>
                </TouchableOpacity>
            </View>

            {passwordForgot &&

                <ForgotPassword/>
            }

            
        </View>
    )

}

export default Login
const styles = StyleSheet.create
    (
        {
            Container:
            {
                flex: 1,
                // backgroundColor:'#152238',
                backgroundColor: 'black',
                justifyContent: 'center'

            },

            textInput:
            {

                color: '#fff',
                backgroundColor: "#282C35",
                height: 70,
                margin: 20,
                padding:20,
                borderRadius: 15

            },
            btnContainer:
            {

                backgroundColor: 'blue',
                height: 70,
                width: 100,
                borderRadius: 20,
                alignSelf: "center",
                justifyContent: 'center',
                alignItems: 'center'

            },
            btnText:
            {
                color: '#fff',
                fontSize: 18

            },
            greetingsContainer:
            {
                alignSelf:"center",
                padding:15,
                borderRadius:20,
                
            }
            ,
            greetings:
            {
                color: '#fff',
                marginLeft: 20,
                fontSize: 25
            },
            greetingsSupportingText:
            {
                color: '#fff',
                marginLeft: 20,
                fontSize: 18
            },
            signupContainer:
            {
                flexDirection:'row',
                justifyContent:"space-around",
                margin:20
            },
            signuptext:
            {
                color:'#fff'
            },
            signupbtn:
            {
                color:'#fff'
            }

        }
    )
