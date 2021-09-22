import React ,{useState}from "react"
import { Platform } from "react-native"
import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

import storage from "@react-native-firebase/storage"
import { launchImageLibrary } from "react-native-image-picker"

const Welcome = () => {



    let date=new Date()

    const todaysDate=date.valueOf()

    console.log(todaysDate)


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

                    const ref=storage().ref('/videos/'+todaysDate+'/')
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

        </View>
    )

}

const styles = StyleSheet.create
    (
        {

        }
    )
export default Welcome