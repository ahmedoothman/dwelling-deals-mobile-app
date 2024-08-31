import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { resetPasswordService } from '../../services/userService';
import theme from '../../theme'; // Import your theme file

export default function ResetPasswordScreen() {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [resetPending, setResetPending] = useState(false);
  const navigation = useNavigation();

  const handleSubmitReset = async () => {
    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }
    setResetPending(true);
    const response = await resetPasswordService(otp, password, passwordConfirm);
    if (response.status === 'success') {
      navigation.navigate('Sign In'); // Navigate to login page
    } else {
      setError(response.message);
    }
    setResetPending(false);
  };

  const handleOtpChange = (text) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    if (sanitizedText.length <= 6) {
      setOtp(sanitizedText);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <View style={styles.form}>
        <Text style={styles.infoText}>
          Please enter the OTP sent to your email and your new password
        </Text>
        <TextInput
          mode='outlined'
          label='Enter OTP'
          value={otp}
          onChangeText={handleOtpChange}
          keyboardType='numeric'
          maxLength={6}
          style={styles.input}
          theme={{ colors: { primary: theme.colors.primary } }}
          left={
            <TextInput.Icon
              icon={() => <Icon name='key' size={20} />}
              color={theme.colors.primary}
            />
          }
        />
        <TextInput
          mode='outlined'
          label='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          theme={{ colors: { primary: theme.colors.primary } }}
          left={
            <TextInput.Icon
              icon={() => <Icon name='lock' size={20} />}
              color={theme.colors.primary}
            />
          }
        />
        <TextInput
          mode='outlined'
          label='Confirm Password'
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry
          style={styles.input}
          theme={{ colors: { primary: theme.colors.primary } }}
          left={
            <TextInput.Icon
              icon={() => <Icon name='lock' size={20} />}
              color={theme.colors.primary}
            />
          }
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Button
          mode='contained'
          onPress={handleSubmitReset}
          disabled={resetPending}
          style={styles.button}
        >
          {resetPending ? (
            <ActivityIndicator color='white' />
          ) : (
            'Reset Password'
          )}
        </Button>
      </View>
      <View style={styles.copyright}>
        {/* You can add your copyright component or text here */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background, // Use background color from theme
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: theme.colors.text, // Use text color from theme
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  infoText: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
    color: theme.colors.text, // Use text color from theme
  },
  input: {
    width: '80%',
    marginBottom: 20,
  },
  button: {
    width: '60%',
    marginTop: 10,
  },
  errorText: {
    marginVertical: 10,
    color: theme.colors.danger, // Use danger color from theme
    textAlign: 'center',
  },
  copyright: {
    marginTop: 20,
    // Add styles for your copyright text or component here
  },
});
