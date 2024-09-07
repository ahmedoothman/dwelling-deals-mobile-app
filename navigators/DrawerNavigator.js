import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { deleteToken } from '../storage/tokenStorage';
import { useSelector } from 'react-redux';
import Home from '../screens/dashboard/Home';
import RentScreen from '../screens/dashboard/Rent';
import SellScreen from '../screens/dashboard/Sell';
import HouseDetails from '../screens/dashboard/HouseDetails';
import Wishlist from '../screens/dashboard/Wishlist';
import SettingsBase from '../screens/settings/SettingsBase';
import theme from '../theme';

const Drawer = createDrawerNavigator();

const UserBox = (props) => {
  const user = useSelector((state) => state.auth.user) || {}; // Fallback to empty object

  const handleLogout = async () => {
    await deleteToken();
    props.navigation.navigate('SignIn');
  };

  // Dummy values
  const userName = user.name || 'Guest';
  const userRole = user.role || 'Role';
  const avatarLabel = user.name ? user.name[0] : 'G'; // First letter of the name or 'G' for Guest
  const avatarColor = theme.colors.primary;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Dwelling Deals</Text>
      </View>

      <View style={styles.drawerContent}>
        <Text style={styles.sectionTitle}>Dashboard</Text>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.userBox}>
          <Avatar.Text
            size={40}
            label={avatarLabel}
            style={{ backgroundColor: avatarColor }}
          />
          <View>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userRole}>{userRole}</Text>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('SettingsBase')}
          >
            <IconIon name='settings' size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
            <IconMC name='exit-to-app' size={20} color='white' />
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <UserBox {...props} />}
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Rent') {
            iconName = 'house';
          } else if (route.name === 'Sell') {
            iconName = 'sell';
          } else if (route.name === 'Wishlist') {
            iconName = 'favorite';
          } else if (route.name === 'HouseDetails') {
            iconName = 'info';
          } else if (route.name === 'SettingsBase') {
            iconName = 'settings';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        drawerActiveBackgroundColor: theme.colors.primary,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
      })}
    >
      <Drawer.Screen name='Home' component={Home} />
      <Drawer.Screen name='Rent' component={RentScreen} />
      <Drawer.Screen name='Sell' component={SellScreen} />
      <Drawer.Screen name='Wishlist' component={Wishlist} />
      <Drawer.Screen
        name='HouseDetails'
        component={HouseDetails}
        options={{
          title: 'House Details',
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        name='SettingsBase'
        component={SettingsBase}
        options={{ drawerItemStyle: { height: 0 }, title: 'Settings' }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  drawerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  drawerContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#777',
    backgroundColor: '#f4f4f4',
  },
  bottomSection: {
    marginTop: 350,
  },
  userBox: {
    padding: 20,
    borderTopWidth: 1,
    paddingVertical: 10,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  userRole: {
    fontSize: 16,
    color: '#777',
    textTransform: 'capitalize',
  },
  logoutContainer: {
    padding: 10,
  },
  logoutButton: {
    backgroundColor: theme.colors.danger,
    padding: 10,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
  },
});

export default DrawerNavigator;
