import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { housesActions } from '../../store/houses-slice';
import theme from '../../theme';
import HouseCard from '../../components/dashboard/HouseCard';
import {
  getAllHousesService,
  getTopRatedRentHousesService,
  getTopRatedSellHousesService,
} from '../../services/houseService';
import { getMyWishListService } from '../../services/wishlistService';
export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const topRatedRentals = useSelector((state) => state.houses.topRatedRentals);
  const topRatedBuys = useSelector((state) => state.houses.topRatedBuys);

  useEffect(() => {
    const fetchHouses = async () => {
      const response = await getAllHousesService();
      dispatch(housesActions.setHouses(response.data));
    };

    const fetchTopRatedRentHouses = async () => {
      const response = await getTopRatedRentHousesService();
      dispatch(housesActions.setTopRatedRentals(response.data));
    };

    const fetchTopRatedSellHouses = async () => {
      const response = await getTopRatedSellHousesService();
      dispatch(housesActions.setTopRatedBuys(response.data));
    };

    const fetchWishlist = async () => {
      const response = await getMyWishListService();
      dispatch(housesActions.setWishlist(response.data.houses));
    };

    fetchHouses();
    fetchTopRatedRentHouses();
    fetchTopRatedSellHouses();
    fetchWishlist();
  }, []);

  return (
    <ScrollView>
      <View style={styles.welcomeBox}>
        <Text style={styles.titleWelcome}>Welcome,</Text>
        <Text style={styles.titleName}>{user.name?.split(' ')[0]}</Text>
        <Icon name='waving-hand' size={30} color='#9cc0cf' />
      </View>
      <Text style={styles.sectionTitle}>Top Rated Rentals</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollSection}
      >
        {topRatedRentals.map((house) => (
          <HouseCard key={house._id} data={house} />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Top Rated Buys</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {topRatedBuys.map((house) => (
          <HouseCard key={house._id} data={house} />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  welcomeBox: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: 20,
    borderRadius: 10,
  },
  titleWelcome: {
    fontSize: 24,
    marginRight: 10,
    color: 'white',
  },
  scrollSection: {
    marginVertical: 10,
    paddingBottom: 10,
  },
  titleName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 15,
  },
  card: {
    width: 200,
    marginHorizontal: 10,
  },
  image: {
    height: 120,
  },
});
