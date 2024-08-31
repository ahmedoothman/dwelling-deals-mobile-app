import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Changed icon set to MaterialIcons for consistency
import { useNavigation } from '@react-navigation/native';
import { forgotPasswordService } from '../../services/userService';
import theme from '../../theme'; // Assuming you have a similar theme setup in React Native

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }
    setPending(true);
    const response = await forgotPasswordService(email);
    if (response.status === 'success') {
      setMessage('Reset code sent to your email');
      setTimeout(() => navigation.navigate('Reset Password'), 2000); // Navigate after a delay
    } else {
      setError(response.message);
    }
    setPending(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Icon name='lock-outline' size={60} color={theme.colors.primary} />
      </View>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.infoText}>
        Enter your email address to receive a reset code.
      </Text>
      <TextInput
        mode='outlined'
        label='Email Address'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        style={styles.textInput}
        theme={{ colors: { primary: theme.colors.primary } }}
      />
      {message ? <Text style={styles.successText}>{message}</Text> : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button
        mode='contained'
        onPress={handleSubmit}
        disabled={pending}
        style={styles.button}
      >
        {pending ? <ActivityIndicator color='white' /> : 'Send Reset Code'}
      </Button>
      <View style={styles.linkContainer}>
        <Button mode='text' onPress={() => navigation.navigate('SignIn')}>
          Remember your password? Sign in
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: theme.colors.text,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    color: theme.colors.text,
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: '100%',
  },
  successText: {
    marginVertical: 10,
    color: theme.colors.success,
    textAlign: 'center',
  },
  errorText: {
    marginVertical: 10,
    color: theme.colors.danger,
    textAlign: 'center',
  },
  linkContainer: {
    marginTop: 20,
  },
});
