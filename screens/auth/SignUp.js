import React, { useReducer, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  TextInput,
  Button,
  ActivityIndicator,
  RadioButton,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { signUpService } from '../../services/userService';
import { initialState, reducer } from './SignUpReducer';
import theme from '../../theme';

const SignUpScreen = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERRORS' });

    // Validate inputs
    let hasError = false;
    if (!state.name) {
      dispatch({ type: 'SET_NAME_ERROR', payload: 'Name is required' });
      hasError = true;
    }
    if (!state.email) {
      dispatch({ type: 'SET_EMAIL_ERROR', payload: 'Email is required' });
      hasError = true;
    }
    if (!state.password) {
      dispatch({ type: 'SET_PASSWORD_ERROR', payload: 'Password is required' });
      hasError = true;
    }
    if (state.password !== state.passwordConfirm) {
      dispatch({
        type: 'SET_PASSWORD_CONFIRM_ERROR',
        payload: 'Passwords do not match',
      });
      hasError = true;
    }
    if (!state.role) {
      dispatch({ type: 'SET_ROLE_ERROR', payload: 'Role is required' });
      hasError = true;
    }
    if (!state.phoneNumber) {
      dispatch({
        type: 'SET_PHONE_NUMBER_ERROR',
        payload: 'Phone number is required',
      });
      hasError = true;
    }

    if (hasError) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }

    const data = {
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirm: state.passwordConfirm,
      role: state.role,
      phoneNumber: state.phoneNumber,
    };
    const response = await signUpService(data);
    dispatch({ type: 'SET_LOADING', payload: false });

    if (response.status === 'success') {
      navigation.navigate('VerifyEmail');
    } else {
      dispatch({ type: 'SET_ERROR', payload: response.message });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <Icon name='person-add' size={60} color={theme.colors.primary} />
      </View>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        mode='outlined'
        label='Name'
        value={state.name}
        onChangeText={(text) => dispatch({ type: 'SET_NAME', payload: text })}
        style={styles.textInput}
        theme={{ colors: { primary: theme.colors.primary } }}
        error={Boolean(state.nameError)}
      />
      <TextInput
        mode='outlined'
        label='Email'
        value={state.email}
        onChangeText={(text) => dispatch({ type: 'SET_EMAIL', payload: text })}
        keyboardType='email-address'
        autoCapitalize='none'
        style={styles.textInput}
        theme={{ colors: { primary: theme.colors.primary } }}
        error={Boolean(state.emailError)}
      />
      <TextInput
        mode='outlined'
        label='Password'
        value={state.password}
        onChangeText={(text) =>
          dispatch({ type: 'SET_PASSWORD', payload: text })
        }
        secureTextEntry={!showPassword}
        style={styles.textInput}
        theme={{ colors: { primary: theme.colors.primary } }}
        error={Boolean(state.passwordError)}
        right={
          <TextInput.Icon
            icon={() => (
              <Icon
                name={showPassword ? 'visibility-off' : 'visibility'}
                size={24}
                color={theme.colors.primary}
                onPress={() => setShowPassword(!showPassword)}
              />
            )}
          />
        }
      />
      <TextInput
        mode='outlined'
        label='Confirm Password'
        value={state.passwordConfirm}
        onChangeText={(text) =>
          dispatch({ type: 'SET_PASSWORD_CONFIRM', payload: text })
        }
        secureTextEntry={!showPasswordConfirm}
        style={styles.textInput}
        theme={{ colors: { primary: theme.colors.primary } }}
        error={Boolean(state.passwordConfirmError)}
        right={
          <TextInput.Icon
            icon={() => (
              <Icon
                name={showPasswordConfirm ? 'visibility-off' : 'visibility'}
                size={24}
                color={theme.colors.primary}
                onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}
              />
            )}
          />
        }
      />
      <TextInput
        mode='outlined'
        label='Phone Number'
        value={state.phoneNumber}
        onChangeText={(text) =>
          dispatch({ type: 'SET_PHONE_NUMBER', payload: text })
        }
        keyboardType='phone-pad'
        style={styles.textInput}
        theme={{ colors: { primary: theme.colors.primary } }}
        error={Boolean(state.phoneNumberError)}
      />
      <View style={styles.radioButtonContainer}>
        <Text style={styles.radioButtonLabel}>Select Role</Text>
        <RadioButton.Group
          onValueChange={(value) =>
            dispatch({ type: 'SET_ROLE', payload: value })
          }
          value={state.role}
        >
          <RadioButton.Item label='Realtor' value='realtor' />
          <RadioButton.Item label='User' value='user' />
        </RadioButton.Group>
      </View>
      {state.error ? <Text style={styles.errorText}>{state.error}</Text> : null}
      <Button
        mode='contained'
        onPress={handleSignUp}
        disabled={state.loading}
        style={styles.button}
      >
        {state.loading ? <ActivityIndicator color='white' /> : 'Sign Up'}
      </Button>
      <View style={styles.linkContainer}>
        <Button mode='text' onPress={() => navigation.navigate('SignIn')}>
          Already have an account? Sign In
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: theme.colors.text,
  },
  textInput: {
    width: '100%',
    marginBottom: 15,
  },
  radioButtonContainer: {
    marginBottom: 15,
  },
  radioButtonLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: theme.colors.text,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: 10,
  },
  linkContainer: {
    marginTop: 15,
  },
});

export default SignUpScreen;
