import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button, Badge } from 'react-native-paper';
import { useSelector } from 'react-redux'; // To fetch wishlist from Redux store
import HouseCard from '../../components/dashboard/HouseCard'; // Ensure this component is adapted for React Native
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

function WishlistScreen() {
  // Assuming wishlist is stored in Redux under 'wishlist' slice
  const wishlist = useSelector((state) => state.houses.wishlist);
  const navigation = useNavigation();

  const renderHeader = () => (
    <View style={styles.pageHeaderContainer}>
      <Text style={styles.headerText}>Wishlist</Text>
      <View style={styles.resultContainer}>
        <Badge size={30} style={styles.resultBadge}>
          {wishlist.length}
        </Badge>
        <Text style={styles.resultText}>Results</Text>
      </View>
      {/* Optionally, include a button to navigate to other screens or filters */}
      <Button
        mode='contained'
        onPress={() => {
          navigation.navigate('Home'); // Example: navigate to Home or other screen
        }}
        icon={() => <Icon name='home' size={20} color={'white'} />}
        style={styles.homeButton}
      >
        Home
      </Button>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.houseCardContainer}>
      <HouseCard data={item} />
    </View>
  );

  return (
    <FlatList
      data={wishlist}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.grid}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultBadge: {
    backgroundColor: '#4CAF50', // Change color to match your theme
    marginRight: 10,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  grid: {
    padding: 10,
  },
  houseCardContainer: {
    marginBottom: 10,
  },
  homeButton: {
    marginLeft: 10,
  },
});

export default WishlistScreen;
