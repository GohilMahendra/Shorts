

import React, { useEffect, useState } from 'react'

import {Image, StyleSheet, Text,View} from 'react-native'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { catchClause } from '@babel/types'
const Profile=()=>
{



    const [userDetails,setUserDetails]=useState(
        {
            userName:"",
            userID:"",
            photoURL:"",
            varified:false,
            Follwing:0,
            Follwers:0,
            Likes:0,
        }
    )



    

    const getUserDetails=async()=>
    {
       

        try
        {
        const user=await firestore().collection('Users').get()


        console.log(user.docs.data()+"datta")
        setUserDetails(user.docs.data())

        }
        catch(err)
        {

        }
    }

    useEffect
    (
        ()=>

        {
            getUserDetails()

        },
        []
    )
    

    return(


        <View
        style={{flex:1
        ,
        backgroundColor:'black'
        }}
        >


            <View
            style={{
                height:'30%',
                backgroundColor:'black',
              
            }}
                
            >
                <TouchableOpacity
                style={{
                    heigh:100,
                    width:100,
                    borderRadius:100,
                    alignItems:'center',
                    alignSelf:'center',
                    margin:20
                }}
                >
                <Image
                source={
                    {
                        uri:auth().currentUser.photoURL
                    }
                }
                style={{
                  
                    backgroundColor:'#fff',
                
                    height:100,
                    width:100,
                    borderRadius:100,
                   
                }}
                >

                </Image>
                <Text
                style={{
                    position:"absolute",
                  
                    top:2,
                    right:10,
                    fontSize:18
                   
                }}
                >+</Text>
                </TouchableOpacity>

                <Text
                style={{
                    color:'#fff',
                    fontSize:20,
                    alignSelf:'center'
                }}
                >
                {auth().currentUser.displayName}
                </Text>
                <View
                style={{
                    height:50,
                    flexDirection:"row",
                    justifyContent:'space-around',
                    marginVertical:20
                }}
                >
                    <View style={styles.profileDetailsContainer}>
                        <Text
                        style={{
                            color:"#fff"
                        }}
                        >
                            Follwing
                        </Text>
                        <Text style={styles.text}>
                            {userDetails.Follwing}
                        </Text>
                    </View>
                    <View style={styles.profileDetailsContainer}>
                        <Text
                        style={{
                            color:"#fff"
                        }}
                        >
                            Follwers
                        </Text>
                        <Text style={styles.text}>
                            {userDetails.Follwers}
                        </Text>
                    </View>
                    <View style={styles.profileDetailsContainer}>
                        <Text
                        style={{
                            color:"#fff"
                        }}
                        >
                            Likes
                        </Text>
                        <Text style={styles.text}>
                            {userDetails.Likes}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                onPress={()=>AddProfile()}
                style={{
                    alignSelf:'center',
                    alignItems:'center',
                    backgroundColor:'#fff',
                    padding:10,
                    borderRadius:10
                }}
                >
                    <Text style={[styles.text,{color:'black'}]}>EDIT PROFILE</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}


const styles=StyleSheet.create
(
    {


        profileDetailsContainer:
        {
            alignItems:'center',
            paddingHorizontal:10,
            borderRightWidth:0.7,
            borderLeftColor:'#fff',
            borderLeftWidth:0.7,
            borderRightColor:"#fff"
        },
        text:{
            color:'#fff',
            fontSize:18,
            
            
        }
    }
)
export default Profile