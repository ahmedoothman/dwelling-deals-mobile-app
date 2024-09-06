import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

function Filter() {
  const route = useRoute();
  const navigation = useNavigation();

  // Get filter options from route parameters
  const filtersOptions = route.params || {};

  const [filters, setFilters] = useState({
    purpose: filtersOptions.purpose || purpose,
    bedrooms: filtersOptions.bedrooms || '',
    bathrooms: filtersOptions.bathrooms || '',
    price: filtersOptions.price || '',
    area: filtersOptions.area || '',
  });

  const handleChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleClear = () => {
    setFilters({
      purpose: purpose,
      bedrooms: '',
      bathrooms: '',
      price: '',
      area: '',
    });
    // apply filter
    navigation.navigate(filters.purpose === 'rent' ? 'Rent' : 'Sell');
  };

  const applyFiltersHandler = () => {
    const params = {
      bedrooms: filters.bedrooms,
      bathrooms: filters.bathrooms,
      price: filters.price,
      area: filters.area,
    };
    navigation.navigate(filters.purpose === 'rent' ? 'Rent' : 'Sell', params);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>Filter Properties</Text>
        <TextInput
          style={styles.input}
          label='Number of bedrooms'
          value={filters.bedrooms}
          onChangeText={(text) => handleChange('bedrooms', text)}
          keyboardType='numeric'
        />
        <TextInput
          style={styles.input}
          label='Number of bathrooms'
          value={filters.bathrooms}
          onChangeText={(text) => handleChange('bathrooms', text)}
          keyboardType='numeric'
        />
        <TextInput
          style={styles.input}
          label='Price'
          value={filters.price}
          onChangeText={(text) => handleChange('price', text)}
          keyboardType='numeric'
        />
        <TextInput
          style={styles.input}
          label='Area (sq ft)'
          value={filters.area}
          onChangeText={(text) => handleChange('area', text)}
          keyboardType='numeric'
        />
        <Button
          mode='contained'
          onPress={applyFiltersHandler}
          style={styles.button}
        >
          Apply Filters
        </Button>
        <Button mode='outlined' onPress={handleClear} style={styles.button}>
          Clear
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default Filter;
