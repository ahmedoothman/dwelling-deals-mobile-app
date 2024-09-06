import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigators/StackNavigator';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './store/index.js';
import theme from './theme';
const App = () => {
  useEffect(() => {}, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
