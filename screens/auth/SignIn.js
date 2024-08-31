import React, { useReducer } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { loginService } from '../../services/userService';
import { initialState, reducer } from './SignInReducer'; // Adjust path to your reducer
import theme from '../../theme'; // Adjust the path to your theme file

const SignInScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });

    // Validate inputs
    let hasError = false;
    if (!state.email) {
      dispatch({ type: 'SET_EMAIL_ERROR', payload: 'Email is required' });
      hasError = true;
    }
    if (!state.password) {
      dispatch({ type: 'SET_PASSWORD_ERROR', payload: 'Password is required' });
      hasError = true;
    }

    if (hasError) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }

    const data = { email: state.email, password: state.password };
    const response = await loginService(data);
    dispatch({ type: 'SET_LOADING', payload: false });

    if (response.status === 'success') {
      navigation.navigate('Base'); // Adjust this based on your navigation structure
    } else {
      dispatch({ type: 'SET_ERROR', payload: response.message });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label='Email'
        mode='outlined'
        value={state.email}
        onChangeText={(text) => dispatch({ type: 'SET_EMAIL', payload: text })}
        style={[styles.input, { borderColor: theme.colors.primary }]} // Apply custom outline color from theme
        theme={{ colors: { primary: theme.colors.primary } }} // Apply custom outline color using theme prop
        left={<TextInput.Icon icon={() => <Icon name='email' size={20} />} />}
        autoCompleteType='email'
        keyboardType='email-address'
        autoCapitalize='none'
        error={Boolean(state.emailError)}
      />
      <TextInput
        label='Password'
        mode='outlined'
        value={state.password}
        onChangeText={(text) =>
          dispatch({ type: 'SET_PASSWORD', payload: text })
        }
        style={[styles.input, { borderColor: theme.colors.primary }]} // Apply custom outline color from theme
        theme={{ colors: { primary: theme.colors.primary } }} // Apply custom outline color using theme prop
        secureTextEntry={!showPassword}
        left={<TextInput.Icon icon={() => <Icon name='lock' size={20} />} />}
        right={
          <TextInput.Icon
            icon={() => (
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                onPress={() => setShowPassword(!showPassword)}
              />
            )}
          />
        }
        error={Boolean(state.passwordError)}
      />
      <Button
        mode='contained'
        onPress={handleLogin}
        loading={state.loading}
        style={styles.button}
      >
        Sign In
      </Button>
      <View style={styles.footer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Forgot Password')}
        >
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={state.snackbarVisible}
        onDismiss={() => dispatch({ type: 'CLOSE_SNACKBAR' })}
        action={{
          label: 'Close',
          onPress: () => dispatch({ type: 'CLOSE_SNACKBAR' }),
        }}
        style={styles.snackbar}
      >
        {state.error}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  snackbar: {
    margin: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
