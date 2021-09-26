

import React from 'react'

import {Image, StyleSheet, Text,View} from 'react-native'

import auth from '@react-native-firebase/auth'
import { TouchableOpacity } from 'react-native-gesture-handler'
const Profile=()=>
{

    

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
                <Image
                source={
                    {
                        uri:auth().currentUser.photoURL
                    }
                }
                style={{
                    height:100,
                    width:100,
                    borderRadius:100,
                    alignSelf:'center',
                    margin:20
                }}
                >

                </Image>

                <Text
                style={{
                    color:'#fff',
                    fontSize:20,
                    alignSelf:'center'
                }}
                >
                    @Tony_Stark
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
                            0
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
                            0
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
                            0
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
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