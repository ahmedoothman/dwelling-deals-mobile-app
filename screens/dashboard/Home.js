import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
export default function Home() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Home</Text>
      <Button title='Log Out' onPress={() => navigation.navigate('Sign In')} />
    </View>
  );
}
