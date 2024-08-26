import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/dashboard/Home';
import RentScreen from '../screens/dashboard/Rent';
import SellScreen from '../screens/dashboard/Sell';
import HouseDetails from '../screens/dashboard/HouseDetails';
import MyHouses from '../screens/dashboard/MyHouses';
import Admin from '../screens/dashboard/Admin';
import Profile from '../screens/dashboard/Profile';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' component={Home} />
      <Drawer.Screen name='Rent' component={RentScreen} />
      <Drawer.Screen name='Sell' component={SellScreen} />
      <Drawer.Screen name='House Details' component={HouseDetails} />
      <Drawer.Screen name='My Houses' component={MyHouses} />
      <Drawer.Screen name='Admin' component={Admin} />
      <Drawer.Screen name='Profile' component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
