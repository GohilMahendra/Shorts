

import React, { useEffect, useState } from "react"

import {View,Text} from 'react-native'
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"



import firestore from '@react-native-firebase/firestore'
import SearchResultCard from "../../components/Search/SearchResultCard"
const Search=({navigation})=>
{


    const [search,setsearch]=useState("")

    const [results,setresults]=useState([])


    const searchCreater=async()=>
    {

        if(search=="" || search==null)
        return

        try
        {
        const qry=firestore()
        .collection('Users').
        where('userName','>=',search)
        .where('userName','<=',search+'\uf8ff')
        .limit(10)
        const result=await qry.get()





        let list=[]

        result.docs.forEach
        (
            function(child)
            {
                list.push({id:child.id,...child.data()})
            }
        )


        console.log(list)
        setresults(list)
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
            
            
            >
               <SearchResultCard
               data={
                   item
               }
               >

               </SearchResultCard>

            </TouchableOpacity>
        )

    }

    useEffect
    (
        ()=>
        {

            searchCreater()
        },
        [search]
    )

    return(
      
        <View
        style={{
            flex:1,
            backgroundColor:'black'
        }}
        >

        <View
        style={{
            flexDirection:'row',
            margin:10,
            height:50,
            borderRadius:20,
            backgroundColor:'#383838',

            
        }}
        >



        <FontAwesome5Icon
        name="search"
        size={20}
        color="#fff"
        style={
            {
                alignSelf:'center',
                margin:10
            }
        }
        
     
        />

        <TextInput
        

        value={search}
        onChangeText={text=>setsearch(text)}


        style={
            {
               flex:1,
               color:'#fff',
               fontSize:20
               
            }
        }
        >

        </TextInput>

       </View>
       <FlatList
        style={
            {
                margin:10,
                
            }
        }

        data={results}
        renderItem={renderItem}
        keyExtractor={item=>item.id}

        >

        </FlatList>


        </View>
    )
}
export default Search