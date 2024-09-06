import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button, Badge } from 'react-native-paper';
import useFilteredHouses from '../../hooks/useFilteredHouses';
import HouseCard from '../../components/dashboard/HouseCard'; // Ensure this component is adapted for React Native
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
function SaleScreen() {
  const { filteredHouses, filtersState } = useFilteredHouses('sale');
  const navigation = useNavigation();
  const renderHeader = () => (
    <View style={styles.pageHeaderContainer}>
      <Text style={styles.headerText}>For Sale</Text>
      <View style={styles.resultContainer}>
        <Badge size={30} style={styles.resultBadge}>
          {filteredHouses.length}
        </Badge>
        <Text style={styles.resultText}>Results</Text>
      </View>
      {/* Optionally, include a button to open the filter modal */}
      <Button
        mode='contained'
        onPress={() => {
          navigation.navigate('FilterModal', filtersState);
        }}
        icon={() => <Icon name='filter' size={20} color={'white'} />}
        style={styles.filterButton}
      >
        Filter
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
      data={filteredHouses}
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
  filterButton: {
    marginLeft: 10,
  },
});

export default SaleScreen;
