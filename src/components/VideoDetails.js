



import React, { useEffect, useState } from "react";


import auth from '@react-native-firebase/auth'
import {View ,Text, TouchableOpacity} from 'react-native'


import firestore from '@react-native-firebase/firestore'
import { tan } from "react-native-reanimated";
import { combineReducers } from "redux";
import { useNavigation } from "@react-navigation/core";
import RoundImage from "./RoundImage";
const VideoDetails=(props)=>
{

    const {data}=props

    const navigation=useNavigation()

  
    const [follwing,setfollwing]=useState(
        false
    )


    const isFollwing=async()=>
    {
        const isExist=await firestore().collection('Follwing').
        doc(auth().currentUser.uid)
        .collection('LookUps')
        .doc(data.channelID)
        .get()


        console.log(isExist.exists)
        setfollwing(isExist.exists)

    }
    useEffect
    (
        ()=>
        {

            
            isFollwing()

               },
        []
    )

    const onFolloW=async()=>
    {

        const qry=
       await firestore().collection('Followers').
       doc(data.channelID)
       .collection('LookUps')
       .doc(auth().currentUser.uid)
       .set({})

       const follwoing=await firestore().collection('Follwing').
       doc(auth().currentUser.uid)
       .collection('LookUps')
       .doc(data.channelID)
       .set({})
        



    }


    return(
        <View
        style={{
            position:'absolute',
            left:15,
            bottom:50,
        
        }}
        >

            <Text
            style={
                {
                    color:"#fff",
                    fontSize:20
                }
            }
            >{data.Title}</Text>
              <Text
            style={
                {
                    color:"#fff",
                    fontSize:20
                }
            }
            >{data.SongName}</Text>

            <View
            style={
                {
                    flexDirection:'row',
                    
                }
            }
            >

            <Text
              style={
                {
                    color:"#fff",
                    fontSize:20,
                    marginRight:20
                }
            }
            >{data.channelName}</Text>
            <TouchableOpacity

            onPress={
              ()=>  onFolloW()
            }
            style={
                {
                    backgroundColor:'#000133',
                    borderRadius:5,
                    padding:10,
                    alignSelf:'flex-end',
                    justifyContent:'center'
                }
            }
            >
                <Text
                style
                ={
                    {
                        color:"#fff"
                    }
                }
                >{follwing?
                "follwing":"Follow+"}</Text>
            </TouchableOpacity>
            </View>
        
            <View
           style={{
               flexDirection:"row"
           }}

            >
               {
                   data.Tags.map(tag => {
                    // console.log(tag)
                    return(
                    <TouchableOpacity
                    onPress={
                        ()=>navigation.push(
                            "Tags",
                            {
                                Tags:tag
                            }
                        )
                    }

                    key={tag}
                    >
                    <Text

                
                    style={
                        {
                            color:"blue",
                            fontSize:18
                        }
                    }
                    >{tag}</Text>
                    </TouchableOpacity>
                    )
                   })
               }
            </View>
            <View
            style={{
                flexDirection:"row",
             
                marginLeft:0,
                alignSelf:'flex-start',
                width:"100%",
                paddingHorizontal:20,

                
               justifyContent:"space-around"
            }}
            >
              
              <View
              style={{
                  backgroundColor:"blue",
                  width:'80%'
              }}
              >

              </View>
                <View
                style={{
                    alignSelf:"flex-end"
                }}
                >
                <TouchableOpacity
                onPress={
                   ()=>navigation.navigate('Songs',{
                    songID:data.songID
                   }) 
                }
                >
                <RoundImage
              
                imageURL={data.SongCover}
                />
                </TouchableOpacity>
                    </View>

               
            </View>

       
        </View>
    )
}

export default VideoDetails