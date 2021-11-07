

import { existsTypeAnnotation } from "@babel/types";
import { useRoute } from "@react-navigation/core";
import React from "react"
import {
    View,
    Text
  } from "react-native";

  import TagList from "../../components/Tags/TagList";

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

        <TagList
        tags={
            p.params.Tags
        }
        ></TagList>


        </View>
    )

}

export default Tags