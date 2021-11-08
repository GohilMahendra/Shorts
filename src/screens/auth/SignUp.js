
import React, { useEffect, useState } from "react"

import { StyleSheet, Text, View } from "react-native"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"

import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth"
import { launchImageLibrary } from "react-native-image-picker";
const SignUp = ({navigation}) => {



    const [userName,setuserName]=useState("")
    const [userID,setUserID]=useState("")
    const [email,setEmail]=useState("")

    const [photoUrl,setphotoUrl]=useState("")


    const [password,setPassword]=useState("")
    const [IsAvalibleUserID,setISAvalibleUserID]=useState(false)



    const chooseImage=()=>
    {

        launchImageLibrary
        (
            
        )

    }

    useEffect
    (
        ()=>
        
        {

            GetIfIDisAvalible()

        },
        [userID]
    )


    const setUpUserID=(value)=>
    {


        if(value!="")
        {
            if(value[0]!='@')
            {
                value+='@'
            }

        }

        setUserID(value)
    }

    const UploadINDatabase=async(uid)=>
    {

        
        const ref= await firestore().collection('Users').doc(uid).set
        (
            {
                userName:userName,
                userID:userID,
                varified:false,
                Followers:0,
                photoUrl:"",
                Following:0,
                Likes:0,
            }
        )
    }


    const GetIfIDisAvalible=async()=>
    {


        // const qry= firestore().collection('Users').where('userID',
        // '==',userID)

        // const user=await qry.get()

        // if(!user.exists)
        // {
        //     setISAvalibleUserID(true)
        
        // }
    }

    
    const onSignUp=async()=>
    {

        if(IsAvalibleUserID)
        {

        auth().createUserWithEmailAndPassword(email,password).then
        (
            (user)=>{console.log(user)

            auth().currentUser.updateProfile(
                {
                    displayName:userName,

                }
            )
            UploadINDatabase(
            auth().currentUser.uid
            )

            navigation.navigate('Login')
            }
        )
        .catch(err=>console.log(err))

        }
        else
        (
            alert("The UserID alredy Taken")
        )
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
                placeholder="UserName...(displayName)"

                style={styles.textInput}
            />
           <TextInput
                value={userID}
                
                onChangeText={(text)=>setUpUserID(text)}
                clearButtonMode={"always"}
                placeholderTextColor="#fff"
                maxLength={20}
            
                
                
                placeholder="UserID..(Unique Name)"

                style={[styles.textInput,{color:(IsAvalibleUserID)?'green':'red'}]}
            >

            </TextInput>
            <TextInput
                value={email}
                onChangeText={(text)=>setEmail(text)}
                clearButtonMode={"always"}
                placeholderTextColor="#fff"
                maxLength={50}
                textContentType="emailAddress"
                placeholder="Email..  (For Varification)"

                style={styles.textInput}
            >

            </TextInput>
            <TextInput
                
                value={password}
                onChangeText={(text)=>setPassword(text)}
                maxLength={50}
                placeholderTextColor="#fff"
                placeholder="Password  [one Lower one Upper digit length 8]"
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
                height: 50,
                textAlign:'center',
                marginVertical: 10,
                marginHorizontal:20,
                padding:10,
                borderRadius: 15

            },
            btnContainer:
            {

                backgroundColor: 'blue',
                height: 50,
                width: 100,
                margin:20,
                borderRadius: 20,
                alignSelf: "center",
                justifyContent: 'center',
                alignItems: 'center'

            },
            btnText:
            {
                color: '#fff',
                fontSize: 15

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
