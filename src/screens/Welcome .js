import React ,{useState,useRef}from "react"
import { Platform, Pressable } from "react-native"
import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

import storage from "@react-native-firebase/storage"
import { launchImageLibrary } from "react-native-image-picker"
import auth from "@react-native-firebase/auth"


import { VideoHTMLAttributes } from "vi"
import Animated from "react-native-reanimated"
const Welcome = () => {



    const animationVariable = useRef(new Animated.Value(0)).current;

    const scaleValue = useRef(0);
    let date=new Date()

    const todaysDate=date.toUTCString().split('T')[0]

    const TimeStamp=date.valueOf()
    

    const runAnimationOnClick = () => {

        scaleValue.current=scaleValue.current==0?1:0
        Animated.spring(animationVariable, {
            toValue: scaleValue.current,
            useNativeDriver: false,
        }).start();
     }
  
    const readPermission=()=>
    
    {
        
    }

    const [uploadTask, setUploadTask] = useState();

    const launchMedia=async()=>
    {

        const options={
            
            
        }
        launchImageLibrary(
            {

                mediaType:'video',
                videoQuality:(Platform.OS=='android'?'low':'medium'),
                selectionLimit:1,
                

            },
            response=>
            {
                if(response.didCancel)
                {
                    console.log('canccel')
                }
                else if(!response.didCancel)
                {


                    console.log(response.assets[0].uri)
                    console.log(response.assets[0].duration)
                    console.log(response.fileName)


                    let videoRef='/Videos/'+todaysDate+'/'+
                    auth().currentUser.uid+'-'+TimeStamp
                    const ref=storage().ref(videoRef)
                    const task = ref.putFile(response.assets[0].uri);
                    task.on('state_changed', (taskSnapshot) => {
                        console.log(taskSnapshot);
                      });
                    setUploadTask(task);

                }

            }

        )
    }

    return (
        <View
            style={
                {
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    flex: 1,
                    alignItems: 'center'
                }
            }
        >
            <Text>Welcome</Text>
            <TouchableOpacity

            onPress={()=>launchMedia()}
                style={
                    {
                        backgroundColor: 'blue',
                        height: 50,
                        width: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,

                    }
                }
            >
                <Text
                    style={
                        {
                            color: '#fff',
                            fontWeight: 'bold'
                        }
                    }
                >Upload Video</Text>
            </TouchableOpacity>

            <Pressable
            onPress={()=>runAnimationOnClick()}
            >
            <Animated.View
             style = {{
                 top:250,
                 backgroundColor:'#fff',
                 height:100,
                 width:100,
                transform: [
                              {
                                 scale : animationVariable.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 2],
                                         }),
                              },
                           ],
           }}

            >

            </Animated.View>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create
    (
        {

        }
    )
export default Welcome