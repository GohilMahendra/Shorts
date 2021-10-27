
import { tsNullKeyword } from "@babel/types"
import firestore from "@react-native-firebase/firestore"
import React, { useEffect, useState } from "react"

import {
    Dimensions,
    Text,
    TextBase,
    View,

} from 'react-native'
import { FlatList } from "react-native-gesture-handler"
import VideoPlayer from "../components/VideoPlayer"


const {height,width}=Dimensions.get('screen')

const Home = () =>
{

    const [Videos,setVideos]=useState({})



    const renderItem=({item,index})=>
    {
        console.log(item)
        return(
            <VideoPlayer
            
            data={item}
            ></VideoPlayer>
        )
    }

    const getVideos=async()=>
    {
        try
        {
        const videoDetails=firestore().collection('Videos').limit(10)

        videoDetails.onSnapshot
        (
            
            (snapshot)=>
            {
               
                let posts=[]



                snapshot.forEach
                (
                    function(child)
                    {


                        const post=
                        {
                            id:child.id,
                            Title:child.data().Title,
                            SongName:child.data().SongName,
                            SongCover:child.data().SongCover,
                            SongId:child.data().SongId,
                            Tags:child.data().Tags,
                            VideoUrl:child.data().VideoUrl,
                            ChannelId:child.data().ChannelId,
                            
                            ChannelName:child.data().ChannelName,
                            ChannelThumbnail:child.data().ChannelThumbnail,
                            
                            duration:child.data().duration,
                            likes:child.data().likes,
                            share:child.data().share,
                            comments:child.data().comments,
                        }
                        
                        posts.push(post)

                        console.log(post)
                    }


                  
                )
                setVideos(posts)

            }
        )
     
        ,
    
        err=>console.log(err)
    
      
    }
        catch(err)
        {
            console.log(err)
        }
        
    }
    useEffect
    (
        ()=>
        {

            getVideos()
        },
        []
    )
   
    return(

        <View
        style={{
            flex:1,
            backgroundColor:'#fff'
        }}
        >

            <FlatList
            
            style={{
                
              flex:1
            }}
           
            data={Videos}
            keyExtractor={(item)=>item.id}

            renderItem={renderItem}

            >

            </FlatList>
        

        </View>
    )
    
}

export default Home