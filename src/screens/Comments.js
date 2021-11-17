

import { catchClause } from '@babel/types'
import firestore, { firebase } from '@react-native-firebase/firestore'
import React, { useEffect, useState } from 'react'


import { useRoute } from "@react-navigation/native";
import {StyleSheet, Text,View} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import CommentCard from '../components/CommentCard'
import { RefreshControl } from 'react-native';
import AddComments from '../components/AddComment';
import { useDispatch, useSelector } from 'react-redux';
import { FetchComments, FetchMoreComments } from '../redux/Actions/CommentActions';


const Comments=()=>
{

    const p=useRoute()

    const dispatch=useDispatch()


    const refr=useSelector(state=>state.Comment.commentsLoad)
    const comments=useSelector(state=>state.Comment.comments)
  
    const getComments=async()=>
    {

        
        dispatch(FetchComments(p.params.key))

    }
    useEffect
    (
        ()=>
        {
            getComments()
        
        }
   ,[] )

    const renderItem=({item,index})=>
    {

        console.log(item)
        return(
            <CommentCard
            data={item}
            ></CommentCard>
        )
    }
    return(


        <View
        style={styles.container}
        >

        <FlatList
        refreshControl={
            <RefreshControl
            onRefresh={getComments}
            refreshing={refr}
            >
            </RefreshControl>
        }

        data={comments}
        onEndReached={
            ()=>dispatch(FetchMoreComments())
        }

        renderItem={renderItem}
        keyExtractor={item=>item.id}

        />

        <AddComments
        videoID={p.params.key}

        >
        </AddComments>

        </View>
    )
}


const styles=StyleSheet.create
(
    {
        container:
        {
            backgroundColor:'black',
            flex:1

        }
    }
)
export default Comments