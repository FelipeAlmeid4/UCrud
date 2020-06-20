import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {stack} from '../../config/routes';

const Stack = createStackNavigator();

const ContainerStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      {stack.map(route => (
        <Stack.Screen key={route.name} {...route} />
      ))}
    </Stack.Navigator>
  );
};

export default ContainerStack;
