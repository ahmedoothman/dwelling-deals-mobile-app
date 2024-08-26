// theme.js
import { DefaultTheme } from 'react-native-paper';
import {
  PRIMARY_COLOR_DARK,
  PRIMARY_COLOR_LIGHT,
  SECONDARY_COLOR_DARK,
} from './constants/styles/colors'; // Adjust the path accordingly

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY_COLOR_DARK, // Outline color for focused state
    accent: SECONDARY_COLOR_DARK, // Outline color for unfocused state
    text: PRIMARY_COLOR_LIGHT, // Text color
    background: 'white', // Background color
  },
};

export default theme;
