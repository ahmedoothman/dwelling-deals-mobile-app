import { API_URL } from '../constants/global/api';
import { getToken } from '../storage/tokenStorage';
import axios from 'axios';

//{{URL}}/api/wishlists
let token = getToken();
//getMyWishList
export const getMyWishListService = async () => {
  token = getToken();
  try {
    const response = await axios.get(`${API_URL}/api/wishlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: 'success', data: response.data.data };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        statusCode: error.code,
        message: error.message + ' Please check your internet connection',
      };
    } else {
      return {
        status: 'error',
        statusCode: error.response.statusCode,
        message: error.response.data.message,
      };
    }
  }
};

//addToMyWishList
export const addToMyWishListService = async (data) => {
  token = getToken();
  try {
    const response = await axios.post(`${API_URL}/api/wishlists`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: 'success', data: response.data.data };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        statusCode: error.code,
        message: error.message + ' Please check your internet connection',
      };
    } else {
      return {
        status: 'error',
        statusCode: error.response.statusCode,
        message: error.response.data.message,
      };
    }
  }
};

//removeFromMyWishList
export const removeFromMyWishListService = async (id) => {
  token = getToken();
  try {
    const response = await axios.delete(`${API_URL}/api/wishlists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: 'success', data: response.data.data };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        statusCode: error.code,
        message: error.message + ' Please check your internet connection',
      };
    } else {
      return {
        status: 'error',
        statusCode: error.response.statusCode,
        message: error.response.data.message,
      };
    }
  }
};
