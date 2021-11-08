
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

const EditProfile=()=>
{


    const [userName,setuserName]=useState(auth().currentUser.displayName)
   


   

    



    const ChangeImageData=async(newUrl)=>
    {




        try
        {

        const changeUser=await firestore().collection('Users').doc(
            auth().currentUser.uid
        ).update
        (
            {
                photoURL:newUrl
            }
        )

        const changeAuth=await auth().currentUser.updateProfile(
        {
            photoURL:newUrl
        }
        )




        console.log(changeAuth,changeUser)

    }
    catch(err)
    {
        console.log(err)
    }


    }

    
    const changeImageFromDatabase=async(uri)=>
    {

        try
        {

        
        const path='Profile/'+auth().currentUser.uid+'/'+auth().currentUser.uid



        let ref=storage().ref(path)


        let task= await ref.putFile(uri)


        console.log(task)
        let storagepath=await ref.getDownloadURL()



      await  ChangeImageData(storagepath)

    }
    catch(err)
    {
        console.log(err)
    }

    }

    const chooseImage=async()=>
    {
            launchImageLibrary(
                {
    
                    mediaType: 'photo',
                    selectionLimit: 1,
                    
                    quality:0.5,
                    includeBase64:false
                },
    
                response => {
                    if (response.didCancel) {
                        console.log('cancel')
                    }
    
                    else if (!response.didCancel) {
    
                        console.log(response.assets[0])
    

                        changeImageFromDatabase(response.assets[0].uri)
    
    
                        
    
                    }
    
                }
    
            
        )
    }


    return(
        <View
        style={{
            flex:1,
            backgroundColor:Colors.MateBlack,
            alignItems:"center",
            
        }}
        >



            <RoundImage
            
            imageURL={auth().currentUser.photoURL}
            />

            <TouchableOpacity
            

            style={
                {
                    backgroundColor:Colors.White,
                    alignItems:'center',
                    alignSelf:'center',
                    padding:10,
                    margin:10,
                    borderRadius:15,
                    elevation:15
                }
            }

            onPress={
                ()=>chooseImage()
            }
            >
                <Text
                style={{
                    fontSize:20,
                    fontWeight:'bold',
                    color:Colors.jetBlack
                }}
                >Change Profile Picture</Text>
            </TouchableOpacity>
            <View
            style={{
                flexDirection:'row',
                height:50,
                margin:20,
                borderRadius:20,
                backgroundColor:Colors.Teal,
                justifyContent:'center'
              
            }}
            >
            <Text
            style={{
                padding:5,
                textAlign:'center',
                textAlignVertical:'center',
                color:Colors.White
                
            }}
            >UserName</Text>
            <TextInput

            value={userName}
            onChangeText={text=>setuserName(text)}
            style={{
                backgroundColor:Colors.White,
                flex:1,
              textAlign:'center',
                color:Colors.grey
            }}
            
            
            >

            </TextInput>
            </View>


            <TouchableOpacity
            style={{
                backgroundColor:'blue',
                height:50,
                justifyContent:"center",
                padding:10,
                borderRadius:15
            }}
            >
                <Text
                style={{
                    color:Colors.White,
                    fontSize:20,
                    textAlign:'center',
                    justifyContent:"center"
                }}
                >
                    SAVE CHNAGES
                </Text>
            </TouchableOpacity>
        </View>
    )

}

export default EditProfile

const styles=StyleSheet.create
(
    {
        Container:
        {

        },
        textInput:
        {

        }


    }
)
