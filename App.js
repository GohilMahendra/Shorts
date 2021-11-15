/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { Provider } from 'react-redux';
import RootStackNavigator from './src/navigation/RootStackNavigator';
import store from './src/redux/store/store';


const App= () => {
  
  return (
    
    <Provider store={store}>

     <RootStackNavigator/>
 
     </Provider>
  );
};

export default App;
