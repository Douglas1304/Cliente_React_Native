import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateProduct } from '../screens/CreateProduct';
import { ListProduct } from '../screens/ListProduct';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: '#242F40'
        },
        headerStyle: {
          elevation: 0,
          backgroundColor:'#0C7489',
        }
      }}
    >
      <Stack.Screen name="PaginaScreen1" options={{title:'Registrar'}} component={CreateProduct}  />
      <Stack.Screen name="PaginaScreen2" options={{title:'Listado'}} component={ListProduct}  />
    </Stack.Navigator>
  );
}