/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { ThemeContext } from 'react-native-elements';

import { Provider } from 'react-redux';
import RootStackNavigator from './src/navigation/RootStackNavigator';
import store from './src/redux/store/store';


export const themeContext=React.createContext()
const App= () => {
  

  const [color,setcolor]=useState("red")

  const themeData={color,setcolor}
 
  return (
    
    <ThemeContext.Provider value={themeData}>
    <Provider store={store}>

     <RootStackNavigator/>
 
     </Provider>
     </ThemeContext.Provider>
  );
};

export default App;
