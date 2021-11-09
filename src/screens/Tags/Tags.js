

import { existsTypeAnnotation } from "@babel/types";
import { useRoute } from "@react-navigation/core";
import React from "react"
import {
    View,
    Text
  } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

  import TagList from "../../components/Tags/TagList";
import TagView from "../../components/Tags/TagView";

const Tags=({navigation})=>
{

    const p=useRoute()

    console.log(p)

    return(
        <View
        style={
            {
                flex:1
            }
        }
        >

        <View
        style={
            {
                height:150
            }
        }
        >
        <TagView
        
        hashTag={p.params.Tags}

        />
        </View>
        <View
        style={
            {
                flex:1,
                backgroundColor:'black'
            }
        }
        >
        <TagList
        tags={
            p.params.Tags
        }
        ></TagList>
        </View>

        </View>
    )

}

export default Tags