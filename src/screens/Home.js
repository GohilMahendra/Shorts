
import { tsNullKeyword } from "@babel/types"
import firestore from "@react-native-firebase/firestore"
import React, { useEffect, useState } from "react"

import {
    Dimensions,
    SegmentedControlIOSComponent,
    Text,
    TextBase,
    View,

} from 'react-native'
import { FlatList } from "react-native-gesture-handler"
import EmptyComponent from "../components/EmptyComponent"
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


                      
                        posts.push({id:child.id,...child.data()})
                    }


                  
                )

                console.log(posts)
               setVideos(posts)

            },
            err=>console.log(err)
        )
    

       // return ()=>videoDetails()
      
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

            // contentContainerStyle={
            //     {
            //         flex:1,
            //     }
            // }
           
          //  ListEmptyComponent={EmptyComponent}
            data={Videos}
            keyExtractor={(item)=>item.id}

            renderItem={renderItem}

            >

            </FlatList>
        

        </View>
    )
    
}

export default Home