

import { catchClause } from '@babel/types'
import firestore, { firebase } from '@react-native-firebase/firestore'
import React, { useEffect, useState } from 'react'


import { useRoute } from "@react-navigation/native";
import {StyleSheet, Text,View} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import AddComments from '../components/AddComment'
import CommentCard from '../components/CommentCard'
import { RefreshControl } from 'react-native';


const Comments=()=>
{

    const p=useRoute()


    const [refr,setrefr]=useState(false)
    const [comments,setcomments]=useState([])


    const fetchComments=async()=>
    {

        setrefr(true)

        const comments=await firestore().collection(
            'Comments'
        )
        .doc(p.params.key)
        .collection(
            'reviews'
        )
        .limit(10)
        .get()

        var list=[]

        comments.forEach
        (
            function(child)
            {
            const comment={
                id:child.id,
                comment:child.data().comment,
                name:child.data().name,
                Date:child.data().Date,
                profilePick:child.data().profilePick

            }

            list.push(comment)

        }
        )


        setrefr(false)
        setcomments(list)
    }
    useEffect
    (
        ()=>
        {
            fetchComments()
        
        }
   ,[] )

    const renderItem=({item,index})=>
    {
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
            onRefresh={fetchComments}
            refreshing={refr}
            >

            </RefreshControl>
        }

        data={comments}

        


        renderItem={renderItem}
        keyExtractor={item=>item.id}

        />



        <AddComments>

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