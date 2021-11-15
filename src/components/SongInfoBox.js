
import React ,{useEffect, useRef}from 'react';

import {Animated,Text,View,TouchableOpacity, Dimensions} from 'react-native'

import RoundImage from './RoundImage';

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from '@react-navigation/core';
import { Easing } from 'react-native-reanimated';

const {height,width}=Dimensions.get('screen')
const SongInfoBox=({data})=>
{

    

    const navigation=useNavigation()

    const RoundAnimation=useRef(new Animated.Value(0))

  
   
    const TextAnim=useRef(new Animated.Value(0))


    useEffect
    (
        ()=>
        {
            AnimateText()
            AnimateSongCover()

        },
        []
    )
    const AnimateText=()=>
    {
       Animated.loop(
          

            Animated.sequence
            ([

            Animated.timing
            (

                TextAnim.current,
                {
                    toValue:1.
                    ,duration:1000,
                    useNativeDriver:false
                }
            ),
           Animated.decay
            (
                TextAnim.current,
                {
                    velocity:10,
                   // deceleration:50,

                    useNativeDriver:false
                }
            )
        ])
       ).start() 
    }

    const AnimateSongCover=()=>
    {
          // makes the sequence loop
          Animated.loop(
            
            // runs given animations in a sequence
          
            
            Animated.timing
            (
                RoundAnimation.current,
                {
                    toValue:1,
                    duration:5000,
                    useNativeDriver:false,
                    easing:Easing.bounce
  
                }
  
            )
           
            ).start();
    
            
    }


    return(
        <View
        style={{
            flexDirection:"row",
         
          
        marginVertical:0,
        
            //marginLeft:0,
           paddingHorizontal:20,
           height:70,
           width:width,
        //   backgroundColor:'blue',
            justifyContent:"space-evenly"
        }}
        >
          
          <View
          style={{
        
              flexDirection:'row',
              width:'70%',
           
            
          }}
          >
              <FontAwesome5Icon
              name={"music"}
              style={
                  {
                      marginHorizontal:10,
                      textAlignVertical:"center"
                      ,textAlign:'left'
                  }
              }
              />
            
              <Animated.Text
              style={
                  {
                      fontSize:20,
                      width:100,
                     
                      textAlignVertical:'center',
                      transform:[
                          {
                              translateX:TextAnim.current.interpolate
                              (
                                  {
                                      inputRange:[0,1],
                                      outputRange:[0,-50]
                                      
                                  }
                              )
                          }
                      ]
                  }
              }
              >
                  {
                      data.SongName
                  }
              </Animated.Text>
           

          </View>
            <View
            style={{
                alignSelf:"flex-end"
            }}
            >
              <Animated.View
        
        style={{
            transform:[{
            rotate:RoundAnimation.current.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              })
            }]
        }}
        >
            <TouchableOpacity
            
            onPress={
               ()=>navigation.navigate('Songs',{
                songID:data.songID,
                data:data,
                name:data.SongName
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

export default SongInfoBox