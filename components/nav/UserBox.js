import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIon from 'react-native-vector-icons/Ionicons';
import { deleteToken } from '../../storage/tokenStorage';
import theme from '../../theme';
import { useSelector } from 'react-redux';

const UserBox = (props) => {
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    await deleteToken();
    props.navigation.navigate('SignIn');
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.userBox}>
          <View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userRole}>{user.role}</Text>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('SettingsBase')}
          >
            <IconIon name='settings' size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={async () => await handleLogout()}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
            <Icon name='logout' size={20} color='white' />
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  bottomSection: {
    marginTop: 450, // This pushes the bottom section to the end
  },
  userBox: {
    padding: 20,
    borderTopWidth: 1,
    paddingVertical: 10,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderRadius: 5,
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

export default UserBox;
