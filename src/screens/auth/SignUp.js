
import React, { useState } from "react"

import { StyleSheet, Text, View } from "react-native"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"

import auth from "@react-native-firebase/auth"
const SignUp = ({navigation}) => {



    const [userName,setuserName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    
    
    const onSignUp=()=>
    {

        auth().createUserWithEmailAndPassword(email,password).then
        (
            (user)=>console.log(user)
        )
        .catch(err=>console.log(err))
    }
    return (

        <View style={styles.Container}>



    
            <View style={styles.greetingsContainer}>
            <Text
                style={styles.greetings}
            >WELCOME</Text>
            
            <Text
                style={styles.greetingsSupportingText}
            >Register Here</Text>
            </View>
            <TextInput
                value={userName}
                onChangeText={(text)=>setuserName(text)}
                clearButtonMode={"always"}
                placeholderTextColor="#fff"
                maxLength={50}
                placeholder="UserName.."

                style={styles.textInput}
            >

            </TextInput>
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
                onPress={()=>onSignUp()}
                style={styles.btnContainer}
            >
                <Text
                    style={styles.btnText}
                >Register</Text>
            </TouchableOpacity>
            <View
            style={styles.signupContainer}
            >
                <Text style={styles.signuptext}>
                    Already Have an Account</Text>
                <TouchableOpacity
                onPress={()=>navigation.navigate('Login')}
                >
                    <Text style={styles.signupbtn}>Sign In!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

export default SignUp
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
