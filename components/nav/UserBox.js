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

const UserBox = (props) => {
  const handleLogout = async () => {
    await deleteToken();
    props.navigation.navigate('SignIn');
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.content}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.userBox}>
        <View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userRole}>Admin</Text>
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
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
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1, // Ensures this takes up the remaining space
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
  },
  userRole: {
    fontSize: 16,
    color: '#777',
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
