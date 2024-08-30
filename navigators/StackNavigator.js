import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import VerifyEmail from '../screens/auth/VerifyEmail';
import Base from '../screens/dashboard/Base';
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Sign In' component={SignIn} />
      <Stack.Screen name='Sign Up' component={SignUp} />
      <Stack.Screen name='Verify Email' component={VerifyEmail} />
      <Stack.Screen
        name='Base'
        component={Base}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
