import { isTemplateElement } from "@babel/types";
import { firebase } from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";

import { View,Image, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import CustomBlueView from "./CustomBlurView";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { NavigationContainer, useNavigation } from "@react-navigation/native";


import auth from '@react-native-firebase/auth'
import firestore from "@react-native-firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";
const { height, width } = Dimensions.get('screen')
const VideoReview = (props) => {

    const { data } = props

    const navigation = useNavigation()

    const [liked, setliked] = useState(false)



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
                await IsLiked();
           
        }
        ,
        []
    )

    const LikeAction = async () => {
        setliked(!liked)

        
        const res = await firestore()
            .collection('Likes')
            .doc(data.id)
            .collection('lookups')
            .doc(auth().currentUser.uid)
            .get()

        console.log(res)
        if (res.exists) {

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
        }
        else {
            if (!liked) {
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
    }


    return (
        <View
            style={styles.Container}



        >


            <Image
            
            style={
                {
                    height:70,
                    width:70,
                    alignSelf:'center',
                    borderRadius:50
                }
            }
            source={
                {
                    uri:auth().currentUser.photoURL
                }
            }
            
            />
 
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
                        >{data.likes}</Text>
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
                    >{data.comments}</Text>

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