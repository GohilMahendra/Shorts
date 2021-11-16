
import React, { useEffect, useRef } from 'react';

import { Animated, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'

import RoundImage from './RoundImage';

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from '@react-navigation/core';
import { Easing } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from '../constants/colors';

const { height, width } = Dimensions.get('screen')
const SongInfoBox = ({ data }) => {



    const navigation = useNavigation()

    const RoundAnimation = useRef(new Animated.Value(0))

    const TextAnim = useRef(new Animated.Value(0))


    useEffect
        (
            () => {
                AnimateText()
                AnimateSongCover()

            },
            []
        )
    const AnimateText = () => {
        Animated.loop(


            Animated.sequence
                ([

                    Animated.timing
                        (

                            TextAnim.current,
                            {
                                toValue: 1.
                                , duration: 5000,
                                easing:Easing.inOut(Easing.ease),
                                useNativeDriver: false
                            }
                        ),
                    
                    Animated.spring
                    (
                        TextAnim.current,
                        {
                            toValue:-1,
                            useNativeDriver:false
                        }

                    )
                   
             
                ])
        ).start()
    }

    const AnimateSongCover = () => {
        // makes the sequence loop
        Animated.loop(

            // runs given animations in a sequence


            Animated.timing
                (
                    RoundAnimation.current,
                    {
                        toValue: 1,
                        duration: 5000,
                        useNativeDriver: false,
                        easing: Easing.linear

                    }

                )

        ).start();


    }


    return (
        <View
            style={styles.Container}
        >

           
              
                 <ScrollView
                horizontal
                style={
                    {
                        width:'80%'
                    }
                }
                >
                 <Animated.View
                style={[styles.TextContainer
                ,{
                    transform: [{
                        translateX: RoundAnimation.current.interpolate({
                            inputRange: [-1,0, 1],
                            outputRange: [0, 300,-350]
                        })
                    }]
                }
            ]
                }
            >
                
                <FontAwesome5Icon
                    name={"music"}

                    color={Colors.White}
                    style={styles.musicIcon
                    }
                />
               
                <Text
                    style={
                        {
                            fontSize: 20,
                            width: 250,
                            color:Colors.White,

                            direction:"rtl",
                            

                            
                           
                            textAlignVertical: 'center',
                          
                        }
                    }
                    numberOfLines={1}
                >
                  testing testinfj asbhabsdhj iaBSDhabhd
                </Text>
                </Animated.View>
                </ScrollView>
              
           
            <View
                style={{
                    alignSelf: "flex-end"
                }}
            >
                <Animated.View

                    style={{
                        transform: [{
                            rotate: RoundAnimation.current.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']
                            })
                        }]
                    }}
                >
                    <TouchableOpacity

                        onPress={
                            () => navigation.navigate('Songs', {
                                songID: data.songID,
                                data: data,
                                name: data.SongName
                            })
                        }
                    >


                        <RoundImage

                            imageURL={data.SongCover}
                        />
                    </TouchableOpacity>
                </Animated.View>
            </View>


        </View>



    )

}

const styles = StyleSheet.create({

    Container:
    {
        flexDirection: "row",

        marginVertical: 0,

        //marginLeft:0,
        paddingHorizontal: 20,
        height: 70,
        width: width,
        //   backgroundColor:'blue',
        justifyContent: "space-evenly"
    },
    TextContainer:
    {

        flexDirection: 'row',
      alignItems:'center',
      width:250
      


    },
    musicIcon:
    {

        flexDirection: 'row',
        marginHorizontal:15,
        textAlignVertical:'center'
        //alignSelf:'center'
        


    }
});

export default SongInfoBox