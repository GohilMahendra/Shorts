import { isTemplateElement } from "@babel/types";
import { firebase } from "@react-native-firebase/firestore";
import React, { useDebugValue, useEffect, useState } from "react";

import { View,Image, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import CustomBlueView from "./CustomBlurView";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { NavigationContainer, useNavigation } from "@react-navigation/native";


import auth from '@react-native-firebase/auth'
import firestore from "@react-native-firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";
import RoundImage from "./RoundImage";
const { height, width } = Dimensions.get('screen')
const VideoReview = (props) => {


    
    const { data } = props

    const navigation = useNavigation()

    const [liked, setliked] = useState(false)


    const [dynamic,setdynamic]=useState
    (
        {
            likes:data.likes,
            comments:data.comments,

        }
    )

    console.log(dynamic)
    const [channal,setchannal]=useState(
        {
                userName:"",
                userID:"",
                varified:false,
                Followers:0,
                photoURL:"",
                Following:0,
                Likes:0,
        }
    )

    const getUserDetails=async(

    )=>
    {
        const userDetails=await firestore()
        .collection('Users')
        .doc(data.channelID).get()



        console.log(userDetails.data())

     
        setchannal(userDetails.data())


    }

    const IsLiked=async()=>
    {

        try
        {
        const res= await firestore()
        .collection('Likes')
        .doc(data.id)
        .collection('lookups')
        .doc(auth().currentUser.uid)
        .get()


        

        if(res.exists)
        {
        setliked(true)
        }
    }
    catch(err)
    {
        console.log(err)
    }
    }

    useEffect
    (
        async()=>
        {

            console.log("refresged")
                await IsLiked();

                await getUserDetails()
           
        }
        ,
        []
    )

    const LikeAction = async () => {
     
        
        const res = await firestore()
            .collection('Likes')
            .doc(data.id)
            .collection('lookups')
            .doc(auth().currentUser.uid)
            .get()

        if (res.exists) {

            setliked(false)



            setdynamic({...dynamic,likes:dynamic.likes-1})

            await firestore()
                .collection('Likes')
                .doc(data.id)
                .collection('lookups')
                .doc(auth().currentUser.uid)
                .delete()

            await firestore()
            .collection('Videos')
            .doc(data.id)
            .update
            (
                {
                    likes:firebase
                    .firestore
                    .FieldValue
                    .increment(-1)
                }
            )

            await firestore()
            .collection('Users')
            .doc(auth().currentUser.uid)
            .update
            (
                {
                    likes:firebase
                    .firestore
                    .FieldValue
                    .increment(-1)
                }
            )
        }
        else {
                setdynamic({...dynamic,likes:dynamic.likes+1})

                setliked(true)
                await firestore()
                    .collection('Likes')
                    .doc(data.id)
                    .collection('lookups')
                    .doc(auth().currentUser.uid)
                    .set({})
                    
            await firestore()
            .collection('Videos')
            .doc(data.id)
            .update
            (
                {
                    likes:firebase.firestore
                    .FieldValue
                    .increment(1)
                }
            )
            }

        
    }


    return (
        <View
            style={styles.Container}



        >


            <TouchableOpacity

            
            // style={
            //     {
            //         height:100,
            //         width:100,
            //         backgroundColor:'#fff',
                    
            //     }
            // }
            onPress={
                ()=>navigation.navigate('userDetails',{
                    channelThumbnail:data.channelThumbnail,
                    channelID:data.channelID,
                    chanalName:data.channelName
                })
            }
            >


              {
                channal.photoURL!="" &&
              
              <RoundImage
                
                imageURL={channal.photoURL}

                >

                </RoundImage>}
            </TouchableOpacity>    
           <TouchableOpacity
                onPress={() => LikeAction()}
            >
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 10
                    }}
                >

                    <View
                        style={{
                            backgroundColor: "#fff"
                            ,

                            height: 70,
                            width: 70,
                            borderRadius: 15,
                            opacity: 0.2
                        }}
                    >


                    </View>

                    <View
                        style={
                            {
                                position: "absolute"
                            }
                        }
                    >

                        <FontAwesome5
                            name="heart"
                            solid={(liked) ? true : false}
                            size={30}
                            color={
                                "red"
                            }
                        >

                        </FontAwesome5>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#fff",
                                textAlign: 'center'
                            }}
                        >{dynamic.likes}</Text>
                    </View>


                </View>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={() => navigation.navigate('Comments', { key: data.id })}
            >
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 10
                }}
            >

                <View
                    style={{
                        backgroundColor: "#fff"
                        ,

                        height: 70,
                        width: 70,
                        borderRadius: 15,
                        opacity: 0.3
                    }}
                >


                </View>

                <View
                    style={
                        {
                            position: "absolute"
                        }
                    }
                >

                    <FontAwesome5
                        name="comment-dots"
                        size={30}
                        color={
                            "#fff"
                        }
                    >

                    </FontAwesome5>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#fff",
                            textAlign: 'center'
                        }}
                    >{dynamic.comments}</Text>

                </View>




            </View>
            </TouchableOpacity>

            <Pressable
               
            >
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 10
                    }}
                >

                    <View
                        style={{
                            backgroundColor: "#fff"
                            ,

                            height: 70,
                            width: 70,
                            borderRadius: 15,
                            opacity: 0.5
                        }}
                    >


                    </View>

                    <View
                        style={
                            {
                                position: "absolute"
                            }
                        }
                    >

                        <FontAwesome5
                            name="share"
                            size={30}
                            color={
                                "#fff"
                            }
                        >

                        </FontAwesome5>

                    </View>


                </View>
            </Pressable>

        </View>
    )

}

const styles = StyleSheet.create
    (
        {
            Container:
            {
                width: 100,
                height: '50%',
                position: "absolute",
                right: 5,
                bottom: 100,

            }
        }
    )

export default VideoReview