import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import VerifyEmail from '../screens/auth/VerifyEmail';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import Filter from '../components/dashboard/Filter'; // Your Filter component
import Base from '../screens/dashboard/Base';
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SignIn'
        component={SignIn}
        options={{ title: 'Sign In' }}
      />
      <Stack.Screen
        name='SignUp'
        component={SignUp}
        options={{ title: 'Sign Up' }}
      />
      <Stack.Screen
        name='VerifyEmail'
        component={VerifyEmail}
        options={{ title: 'Verify Email' }}
      />
      <Stack.Screen
        name='ForgotPassword'
        component={ForgotPasswordScreen}
        options={{ title: 'Forgot Password' }}
      />
      <Stack.Screen
        name='ResetPassword'
        component={ResetPasswordScreen}
        options={{ title: 'Reset Password' }}
      />
      <Stack.Screen
        name='FilterModal'
        component={Filter}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name='Base'
        component={Base}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
