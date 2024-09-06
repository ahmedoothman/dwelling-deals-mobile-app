import React, { useEffect, useState } from 'react';
import { ScrollView, View, Image, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { Avatar, Button, Card, Divider, List, Text } from 'react-native-paper';
import { ActivityIndicator } from 'react-native-paper';
import { PRIMARY_COLOR_DARK } from '../../constants/styles/colors';
import BathroomOutlinedIcon from 'react-native-vector-icons/MaterialIcons';
import BedroomChildOutlinedIcon from 'react-native-vector-icons/MaterialIcons';
import CropOriginalOutlinedIcon from 'react-native-vector-icons/MaterialIcons';
import LocalAtmOutlinedIcon from 'react-native-vector-icons/MaterialIcons';
import EmailOutlinedIcon from 'react-native-vector-icons/MaterialIcons';
import LocalPhoneOutlinedIcon from 'react-native-vector-icons/MaterialIcons';

const HouseDetails = () => {
  const houses = useSelector((state) => state.houses.houses);
  const [house, setHouse] = useState(null);
  const route = useRoute();
  const { houseId: id } = route.params;

  useEffect(() => {
    setHouse(houses.find((house) => house._id === id));
  }, [houses, id]);

  if (!house) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size='large' color={PRIMARY_COLOR_DARK} />
      </View>
    );
  }

  // Render each additional image
  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={styles.smallImage} />
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* House Details */}
      <Text style={styles.title}>{house.title}</Text>
      <Text style={styles.subtitle}>
        {house.address.city}, {house.address.street},{' '}
        {house.address.governorate}
      </Text>

      {/* Main Image */}
      <Image source={{ uri: house.imageUrl }} style={styles.mainImage} />

      {/* Additional Images */}
      <FlatList
        data={house.images}
        renderItem={renderImage}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imageGrid}
      />

      {/* House Info */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Details</Text>
        <View style={styles.info}>
          <View style={styles.infoBox}>
            <LocalAtmOutlinedIcon name='attach-money' size={20} />
            <Text>{house.price.toLocaleString()} EGP</Text>
          </View>
          <View style={styles.infoBox}>
            <BedroomChildOutlinedIcon name='bed' size={20} />
            <Text>{house.bedrooms} bedrooms</Text>
          </View>
          <View style={styles.infoBox}>
            <BathroomOutlinedIcon name='bathtub' size={20} />
            <Text>{house.bathrooms} bathrooms</Text>
          </View>
          <View style={styles.infoBox}>
            <CropOriginalOutlinedIcon name='crop' size={20} />
            <Text>{house.area} sqm</Text>
          </View>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.aboutSection}>
        <Text style={styles.detailsTitle}>About</Text>
        <Text style={styles.aboutText}>{house.description}</Text>
      </View>

      {/* Realtor Info */}
      <Card style={styles.card}>
        <View style={styles.avatarContainer}>
          <Avatar.Text
            size={80}
            label={house.realtor.name[0]}
            style={styles.avatar}
          />
        </View>
        <Card.Content>
          <Text style={styles.realtorName}>{house.realtor.name}</Text>
          <Divider style={styles.divider} />
          <Text style={styles.realtorRole}>REALTOR</Text>
          <Text style={styles.realtorCompany}>THE FALLS REALTY</Text>

          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <EmailOutlinedIcon name='email' size={20} />
              <Text>{house.realtor.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <LocalPhoneOutlinedIcon name='phone' size={20} />
              <Text>{house.realtor.phoneNumber}</Text>
            </View>
            <Button mode='contained' style={styles.contactButton}>
              Contact
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Safety Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.safetyTitle}>Your Safety Matters to Us!</Text>
          <List.Section>
            <List.Item
              title='Only meet in public places like metro stations and malls.'
              left={() => <List.Icon icon='check-circle-outline' />}
            />
            <List.Item
              title='Never go alone to meet a buyer/seller.'
              left={() => <List.Icon icon='check-circle-outline' />}
            />
            <List.Item
              title='Inspect the product properly before purchasing.'
              left={() => <List.Icon icon='check-circle-outline' />}
            />
            <List.Item
              title='Never pay anything in advance before inspection.'
              left={() => <List.Icon icon='check-circle-outline' />}
            />
          </List.Section>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    // Ensure enough height for scrolling
    minHeight: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginVertical: 10,
  },
  mainImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  imageGrid: {
    marginVertical: 10,
  },
  smallImage: {
    width: 120, // Adjust width as needed
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEDEB',
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
    width: '48%',
  },
  aboutSection: {
    marginTop: 20,
  },
  aboutText: {
    color: 'gray',
  },
  card: {
    marginVertical: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  avatar: {
    backgroundColor: '#201E43',
  },
  realtorName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  realtorRole: {
    textAlign: 'center',
    letterSpacing: 3,
    fontSize: 14,
    color: 'gray',
  },
  realtorCompany: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  contactInfo: {
    marginTop: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  contactButton: {
    marginTop: 20,
  },
  safetyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default HouseDetails;
