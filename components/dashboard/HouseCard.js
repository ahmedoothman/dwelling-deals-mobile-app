import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Card, Button, Text, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { housesActions } from '../../store/houses-slice';
import {
  removeFromMyWishListService,
  addToMyWishListService,
} from '../../services/wishlistService';
import { PRIMARY_COLOR_DARK } from '../../constants/styles/colors';
import FavoriteBorderRoundedIcon from 'react-native-vector-icons/MaterialIcons';
import FavoriteRoundedIcon from 'react-native-vector-icons/MaterialIcons';
import BedRoundedIcon from 'react-native-vector-icons/MaterialIcons';
import BathtubRoundedIcon from 'react-native-vector-icons/MaterialIcons';
import AspectRatioRoundedIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

function HouseCard(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { wishlist } = useSelector((state) => state.houses);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const house = props.data;

  useEffect(() => {
    if (house && wishlist) {
      const wishlisted = wishlist.some((item) => item._id === house._id);
      setIsWishlisted(wishlisted);
    }
  }, [wishlist, house]);

  const handleIcon = async () => {
    if (isWishlisted) {
      dispatch(housesActions.removeFromWishlist(house._id));
      await removeFromMyWishListService(house._id);
    } else {
      dispatch(housesActions.addToWishlist(house));
      await addToMyWishListService({ houseId: house._id });
    }
  };

  if (!house) {
    return <ActivityIndicator size='large' color={PRIMARY_COLOR_DARK} />;
  }

  return (
    <Card style={styles.card}>
      <Image source={{ uri: house.imageUrl }} style={styles.image} />
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.price}>
            {house.type === 'sale' ? (
              <Text>{house.price.toLocaleString()} EGP</Text>
            ) : (
              <Text>
                {house.price.toLocaleString()} EGP
                <Text style={styles.perMonth}>/month</Text>
              </Text>
            )}
          </Text>
          <IconButton
            icon={isWishlisted ? 'heart' : 'heart-outline'}
            iconColor={isWishlisted ? 'red' : 'gray'}
            onPress={handleIcon}
          />
        </View>
        <Text style={styles.title}>{house.title}</Text>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <BedRoundedIcon name='bed' size={15} color='gray' />
            <Text>{house.bedrooms} beds</Text>
          </View>
          <View style={styles.detailItem}>
            <BathtubRoundedIcon name='bathtub' size={15} color='gray' />
            <Text>{house.bathrooms} Baths</Text>
          </View>
          <View style={styles.detailItem}>
            <AspectRatioRoundedIcon
              name='aspect-ratio'
              size={15}
              color='gray'
            />
            <Text>{house.area} SqFt</Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button
          mode='contained'
          onPress={() =>
            navigation.navigate('HouseDetails', { houseId: house._id })
          }
          style={styles.button}
        >
          More Info
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: 200,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  perMonth: {
    fontSize: 12,
    color: 'gray',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actions: {
    justifyContent: 'flex-end',
  },
  button: {
    borderRadius: 20,
  },
});

export default HouseCard;
