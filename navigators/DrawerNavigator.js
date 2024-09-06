// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/dashboard/Home';
import RentScreen from '../screens/dashboard/Rent';
import SellScreen from '../screens/dashboard/Sell';
import HouseDetails from '../screens/dashboard/HouseDetails';
import MyHouses from '../screens/dashboard/MyHouses';
import Admin from '../screens/dashboard/Admin';
import Profile from '../screens/dashboard/Profile';
import UserBox from '../components/nav/UserBox';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <UserBox {...props} />}>
      <Drawer.Screen name='Home' component={Home} />
      <Drawer.Screen name='Rent' component={RentScreen} />
      <Drawer.Screen name='Sell' component={SellScreen} />
      <Drawer.Screen
        name='HouseDetails'
        component={HouseDetails}
        options={{
          title: 'House Details',
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen name='My Houses' component={MyHouses} />
      <Drawer.Screen name='Admin' component={Admin} />
      <Drawer.Screen
        name='Profile'
        component={Profile}
        options={{ drawerItemStyle: { height: 0 } }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
