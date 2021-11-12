

import React, { useEffect, useState } from "react"

import {View,Text} from 'react-native'
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"



import firestore from '@react-native-firebase/firestore'
import SearchResultCard from "../../components/Search/SearchResultCard"
import { useDispatch, useSelector } from "react-redux"
import { SearchUser } from "../../redux/Actions/SearchActions"
const Search=({navigation})=>
{


    const [search,setsearch]=useState("")

    const dispatch=useDispatch()
    const results=useSelector(state=>state.Search.searchResults)



  
    const renderItem=({item,index})=>
    {
        return(
            <TouchableOpacity
            
            onPress={
                ()=>navigation.navigate('userDetails',{
                 
                    channelID:item.id,
                  
                })

            }
            
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

            if(search=="" || search==null)
            return
    

            dispatch(SearchUser(search))
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