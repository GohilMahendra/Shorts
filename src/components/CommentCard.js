



import React from "react";

import { View, Text, Image } from 'react-native'
const CommentCard = (props) => {



    const { data } = props

    console.log(data.profilePick)
    // console.log(childern)

    return (
        <View
            style={{

                maxHeight: 200,
                height: 150,
                margin: 20,


            }}
            collapsable={true}
        >

            <View
                style={
                    {
                        flex: 1,
                        opacity: 0.1,
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
                    <Image
                        source={{uri:data.profilePick}}

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

                    />
                    <View>
                        <Text
                            style={
                                {
                                    color: "#fff",
                                    fontSize: 20
                                }
                            }
                        >
                            {data.name}
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