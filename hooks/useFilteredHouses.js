import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const useFilteredHouses = (houseType) => {
  const route = useRoute();
  const { houses } = useSelector((state) => state.houses);
  const [filteredHouses, setFilteredHouses] = useState([]);

  // Extract filters from route params
  const filtersState = {
    purpose: houseType,
    bedrooms: route.params?.bedrooms || '',
    bathrooms: route.params?.bathrooms || '',
    price: route.params?.price || '',
    area: route.params?.area || '',
  };

  useEffect(() => {
    const filteredHouses = houses.filter((house) => {
      let isValid = true;
      isValid = isValid && house.type === houseType;

      const filters = {
        bedrooms: route.params?.bedrooms || '',
        bathrooms: route.params?.bathrooms || '',
        price: route.params?.price || '',
        area: route.params?.area || '',
      };

      if (filters.bedrooms) {
        isValid = isValid && house.bedrooms === Number(filters.bedrooms);
      }
      if (filters.bathrooms) {
        isValid = isValid && house.bathrooms === Number(filters.bathrooms);
      }
      if (filters.price) {
        isValid = isValid && house.price <= Number(filters.price);
      }
      if (filters.area) {
        isValid = isValid && house.area <= Number(filters.area);
      }
      isValid = isValid && house.approved === true;
      return isValid;
    });

    setFilteredHouses(filteredHouses);
  }, [houses, route.params, houseType]);

  return { filteredHouses, filtersState };
};

export default useFilteredHouses;
