

import React, { useEffect, useState } from 'react'

import {Image, StyleSheet, Text,View} from 'react-native'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { catchClause } from '@babel/types'

import {
    FlatList
} from 'react-native-gesture-handler'
import VideoPreviewCard from '../../components/VideoPreviewCard'
import { NavigationContainer } from '@react-navigation/native'
const Profile=({navigation})=>
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


    const [videos,setvideos]=useState([])

    
    const getUserVideos=async()=>

    {

        try
        {
        const qry=firestore().collection('Videos').where('channelID','==',auth().currentUser.uid)
        const results=await qry.get()

        let posts=[]

       
        results.docs.forEach
        (
            function(child)
            {
                posts.push({id:child.id,...child.data()})
            }
        )


       // console.log(posts)
        setvideos(posts)

        }
        catch(err)
        {
            console.log(err)
        }

    }
    const renderItem=({item,index})=>
    {
        return(
            <TouchableOpacity
            
            onPress={
                ()=>navigation.navigate(
                    "UserVideoPlayer",
                    {
                        id:item.id,
                        index:index
                    }
                )
            }
            
            >
              <VideoPreviewCard
              data={
                  item
              }
              >

              </VideoPreviewCard>

            </TouchableOpacity>
        )

    }

    useEffect
    (
        ()=>
        {

            getUserDetails()

            getUserVideos()
        },
        []
    )

    const getUserDetails=async()=>
    {
       

        try
        {
        const user=await firestore().collection('Users').doc(
            auth().currentUser.uid
        ).get()

        console.log(user.data().photoURL+"datta")
        setUserDetails(user.data())

        }
        catch(err)
        {

        }
    }

    useEffect
    (
        ()=>

        {
         
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
                height:'40%',
                backgroundColor:'transparent',
              
            }}
                
            >
                <TouchableOpacity
                style={{
                    height:70,
                    width:70,
                    borderRadius:70,
                    alignItems:'center',
                    alignSelf:'center',
                    margin:10
                }}
                >
                {
                    userDetails.photoURL!="" &&
                    <Image
                source={
                    {
                        uri:userDetails.photoURL
                    }
                }
                style={{
                  
                    backgroundColor:'#fff',
                
                    height:70,
                    width:70,
                    borderRadius:70,
                   
                }}
                >

                </Image>
            
                }
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
                    marginVertical:10
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
                onPress={()=>navigation.navigate('Edit')}
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
           
           <View
           style={
               {
                height:'70%'
               }
           }
           >
            <FlatList
        style={
            {
                margin:10,
               
            }
        }

        data={videos}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={item=>item.id}

        >

        </FlatList>
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