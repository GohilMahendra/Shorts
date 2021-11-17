



import React, { useEffect, useState } from "react";

import { View, Text, Image } from 'react-native'

import firestore, { firebase } from '@react-native-firebase/firestore'
const CommentCard = (props) => {



    const { data } = props


    const [userDetails,setUserDetails]=useState({})
    

    const getUserDetails=async()=>
    {
        
        const user=await firestore().collection('Users').
        doc(data.id).get()

        setUserDetails(user.data())

        
    }
    useEffect
    (

        ()=>
        {

            getUserDetails()

        },
        []
        
    )

    return (
        <View
            style={{

                maxHeight: 200,
                height: 150,
               marginVertical: 10,
               marginHorizontal:20

            }}
            collapsable={true}
        >

            <View
                style={
                    {
                        flex: 1,
                        opacity: 0.2,
                        backgroundColor: '#fff',
                        borderRadius: 20
                    }
                }
            >
            </View>
            <View
                style={
                    {
                        flex: 1,
                        position: "absolute",
                        alignItems: "center",
                        backgroundColor: "transparent"


                    }
                }
            >
                <View
                    style={
                        {
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: "center"
                        }
                    }
                >
                   {(userDetails.photoURL!="") ? <Image
                        source={{uri:userDetails.photoURL}}

                        resizeMode={'cover'}
                        style={
                            {
                                height: 50,
                                width: 50,
                                backgroundColor: '#fff',
                                borderRadius: 70,
                                margin: 10
                            }
                        }

                    />:
                    <View
                     
                        style={
                            {
                                height: 50,
                                width: 50,
                                backgroundColor: '#fff',
                                borderRadius: 70,
                                margin: 10
                            }
                        }

                    />
                    }
                    <View>
                        <Text
                            style={
                                {
                                    color: "#fff",
                                    fontSize: 20
                                }
                            }
                        >
                            {userDetails.userName}
                        </Text>
                        <Text
                            style={
                                {
                                    color: "#fff",
                                    fontSize: 15
                                }
                            }
                        >
                            {data.Date}
                        </Text>

                    </View>
                </View>


                <Text

                    style={{
                        color: '#fff',
                        fontSize: 17,
                        alignSelf: 'flex-start',
                        marginHorizontal: 20
                    }}
                >{data.comment}</Text>
            </View>


        </View>
    )
}

export default CommentCard