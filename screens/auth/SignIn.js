import React, { useReducer, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  TextInput,
  Button,
  Snackbar,
  ActivityIndicator,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import IconX from 'react-native-vector-icons/Ionicons';
import IconY from 'react-native-vector-icons/MaterialCommunityIcons';
import { loginService, getMeService } from '../../services/userService';
import { initialState, reducer } from './SignInReducer';
import theme from '../../theme';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';

const SignInScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchRedux = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const response = await getMeService();
      if (response.status === 'success') {
        dispatchRedux(authActions.login(response.data));

        navigation.navigate('Base');
      }
      setIsCheckingToken(false);
    };

    checkToken();
  }, []);

  const handleLogin = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });

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
    dispatchRedux(authActions.login(response.data));
    dispatch({ type: 'SET_LOADING', payload: false });

    if (response.status === 'success') {
      navigation.navigate('Base'); // Adjust based on your navigation structure
    } else {
      dispatch({ type: 'SET_ERROR', payload: response.message });
    }
  };

  if (isCheckingToken) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size='large' color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <IconY name='lock-outline' size={60} color={theme.colors.primary} />
      </View>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        label='Email'
        mode='outlined'
        value={state.email}
        onChangeText={(text) => dispatch({ type: 'SET_EMAIL', payload: text })}
        style={styles.input}
        theme={{ colors: { primary: theme.colors.primary } }}
        left={<TextInput.Icon icon={() => <IconY name='email' size={20} />} />}
        keyboardType='email-address'
        autoCapitalize='none'
        error={Boolean(state.emailError)}
      />
      {state.emailError ? (
        <Text style={styles.errorText}>{state.emailError}</Text>
      ) : null}

      <TextInput
        label='Password'
        mode='outlined'
        value={state.password}
        onChangeText={(text) =>
          dispatch({ type: 'SET_PASSWORD', payload: text })
        }
        style={styles.input}
        theme={{ colors: { primary: theme.colors.primary } }}
        secureTextEntry={!showPassword}
        left={<TextInput.Icon icon={() => <Icon name='lock' size={20} />} />}
        right={
          <TextInput.Icon
            icon={() => (
              <IconX
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                onPress={() => setShowPassword(!showPassword)}
              />
            )}
          />
        }
        error={Boolean(state.passwordError)}
      />
      {state.passwordError ? (
        <Text style={styles.errorText}>{state.passwordError}</Text>
      ) : null}

      <Button
        mode='contained'
        onPress={handleLogin}
        loading={state.loading}
        disabled={state.loading}
        style={styles.button}
      >
        {'Sign In'}
      </Button>

      <View style={styles.footer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
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
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background, // Updated background color from theme
  },
  avatarContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: theme.colors.text, // Apply custom text color from theme
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    width: '100%',
    marginTop: 16,
  },
  errorText: {
    marginVertical: 5,
    color: theme.colors.danger, // Apply error color from theme
    textAlign: 'center',
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
  snackbar: {
    margin: 16,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreen;
