import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import InfoSettings from './InfoSettings'; // Your InfoSettings component
import PasswordSettings from './PasswordSettings'; // Your PasswordSettings component
const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName='Info'
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name='Info'
        component={InfoSettings}
        options={{
          tabBarLabel: 'Info',
          tabBarIcon: ({ color, size }) => (
            <Icon name='info' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Password'
        component={PasswordSettings}
        options={{
          tabBarLabel: 'Password',
          tabBarIcon: ({ color, size }) => (
            <Icon name='lock' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
