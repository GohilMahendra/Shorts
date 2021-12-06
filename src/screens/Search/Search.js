

import React, { useEffect, useState } from "react"

import {View,Text, StyleSheet} from 'react-native'
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
                ()=>navigation.navigate('CreaterDetails',{
                 
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
        style={styles.Container}
        >

        <View
        style={styles.rowContainer}
        >

        <TextInput
        value={search}
        onChangeText={text=>setsearch(text)}
        style={styles.txtInputSearch}
        >

        </TextInput>
        <FontAwesome5Icon
        name="search"
        size={20}
        color="#fff"
        style={styles.iconSearch}
        
     
        />

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

const styles=StyleSheet.create
(
    {
        Container:
        {
            flex:1,
            backgroundColor:'black'
        },
        rowContainer:
        {
            flexDirection:'row',
            marginLeft:50,
            marginRight:10,
            marginVertical:5,
            height:50,
            borderRadius:10,
            backgroundColor:'#383838',

            
        },
        txtInputSearch:
        {
           flex:1,
           color:'#fff',
           fontSize:20
           
        },
        iconSearch:
        {
            alignSelf:'center',
            margin:10
        }
    
    
    }
)
export default Search