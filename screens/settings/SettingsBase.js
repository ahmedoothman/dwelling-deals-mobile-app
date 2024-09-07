import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import InfoSettings from './InfoSettings'; // Your InfoSettings component
import PasswordSettings from './PasswordSettings'; // Your PasswordSettings component

import theme from '../../theme';
const Tab = createBottomTabNavigator();

function SettingsBase() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Info Settings') {
            iconName = 'info';
          } else if (route.name === 'Password Settings') {
            iconName = 'lock';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary, // Customize active color
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name='Info Settings'
        component={InfoSettings}
        options={{
          tabBarLabel: 'Info',
          headerTitle: 'Info Settings',
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: '#fff',
        }}
      />
      <Tab.Screen
        name='Password Settings'
        component={PasswordSettings}
        options={{
          tabBarLabel: 'Password',
          headerTitle: 'Password Settings',
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: '#fff',
        }}
      />
    </Tab.Navigator>
  );
}

export default SettingsBase;
