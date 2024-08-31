import React, { useReducer } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { TextInput, Button, Snackbar, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signUpService } from '../../services/userService';
import { initialState, reducer } from './SignUpReducer'; // Adjust path to your reducer
import theme from '../../theme'; // Adjust the path to your theme file

const SignUpScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

  const handleSignUp = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });

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
      navigation.navigate('Verify Email'); // Navigate to Sign In on successful sign-up
    } else {
      dispatch({ type: 'SET_ERROR', payload: response.message });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.innerContainer}>
          <TextInput
            label='Name'
            mode='outlined'
            value={state.name}
            onChangeText={(text) =>
              dispatch({ type: 'SET_NAME', payload: text })
            }
            style={styles.input}
            theme={{ colors: { primary: theme.colors.primary } }}
            error={Boolean(state.nameError)}
            left={
              <TextInput.Icon icon={() => <Icon name='account' size={20} />} />
            }
          />
          <TextInput
            label='Email'
            mode='outlined'
            value={state.email}
            onChangeText={(text) =>
              dispatch({ type: 'SET_EMAIL', payload: text })
            }
            style={styles.input}
            theme={{ colors: { primary: theme.colors.primary } }}
            autoCompleteType='email'
            keyboardType='email-address'
            autoCapitalize='none'
            error={Boolean(state.emailError)}
            left={
              <TextInput.Icon icon={() => <Icon name='email' size={20} />} />
            }
          />
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
            left={
              <TextInput.Icon icon={() => <Icon name='lock' size={20} />} />
            }
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
          <TextInput
            label='Confirm Password'
            mode='outlined'
            value={state.passwordConfirm}
            onChangeText={(text) =>
              dispatch({ type: 'SET_PASSWORD_CONFIRM', payload: text })
            }
            style={styles.input}
            theme={{ colors: { primary: theme.colors.primary } }}
            secureTextEntry={!showPasswordConfirm}
            left={
              <TextInput.Icon icon={() => <Icon name='lock' size={20} />} />
            }
            right={
              <TextInput.Icon
                icon={() => (
                  <Icon
                    name={showPasswordConfirm ? 'eye-off' : 'eye'}
                    size={20}
                    onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  />
                )}
              />
            }
            error={Boolean(state.passwordConfirmError)}
          />
          <TextInput
            label='Phone Number'
            mode='outlined'
            value={state.phoneNumber}
            onChangeText={(text) =>
              dispatch({ type: 'SET_PHONE_NUMBER', payload: text })
            }
            style={styles.input}
            theme={{ colors: { primary: theme.colors.primary } }}
            keyboardType='phone-pad'
            error={Boolean(state.phoneNumberError)}
            left={
              <TextInput.Icon icon={() => <Icon name='phone' size={20} />} />
            }
          />
          <View style={styles.radioButtonContainer}>
            <Text style={styles.radioButtonLabel}>Select Role</Text>
            <View style={styles.radioButtonGroup}>
              <RadioButton.Item
                label='Realtor'
                value='realtor'
                status={state.role === 'realtor' ? 'checked' : 'unchecked'}
                onPress={() =>
                  dispatch({ type: 'SET_ROLE', payload: 'realtor' })
                }
                color={theme.colors.primary}
              />
              <RadioButton.Item
                label='User'
                value='user'
                status={state.role === 'user' ? 'checked' : 'unchecked'}
                onPress={() => dispatch({ type: 'SET_ROLE', payload: 'user' })}
                color={theme.colors.primary}
              />
            </View>
            {state.roleError && (
              <Text style={styles.errorText}>{state.roleError}</Text>
            )}
          </View>
          <Button
            mode='contained'
            onPress={handleSignUp}
            loading={state.loading}
            style={styles.button}
          >
            Sign Up
          </Button>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            style={styles.link}
          >
            <Text style={styles.linkText}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
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
  radioButtonContainer: {
    marginBottom: 16,
  },
  radioButtonLabel: {
    marginBottom: 8,
    fontSize: 16,
    color: theme.colors.primary,
  },
  radioButtonGroup: {
    marginBottom: 8,
  },
  link: {
    marginTop: 16,
  },
  linkText: {
    color: theme.colors.primary,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default SignUpScreen;
