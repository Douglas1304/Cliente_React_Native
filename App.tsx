import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';//Agregar para usar navegacion
import { StackNavigator } from './navigator/StackNavigator';

import React from 'react';

const App = () => {
  return (
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
  )
}

export default App;
