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

import {  themes} from "./src/constants/themes";

export const themeContext=React.createContext()
const App= () => {
  

  const [theme,settheme]=useState(themes[0])

  const themeData={theme,settheme}
 
  return (
    
    <themeContext.Provider value={themeData}>
    <Provider store={store}>

     <RootStackNavigator/>
 
     </Provider>
     </themeContext.Provider>
  );
};

export default App;
