import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { resetPasswordService } from '../../services/userService';
import theme from '../../theme';

export default function ResetPasswordScreen() {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [resetPending, setResetPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigation = useNavigation();

  const handleSubmitReset = async () => {
    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }
    setResetPending(true);
    const response = await resetPasswordService(otp, password, passwordConfirm);
    if (response.status === 'success') {
      navigation.navigate('SignIn');
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
      <View style={styles.avatarContainer}>
        <Icon name='lock-reset' size={60} color={theme.colors.primary} />
      </View>
      <Text style={styles.title}>Reset Password</Text>
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
        style={styles.textInput}
        theme={{ colors: { primary: theme.colors.primary } }}
      />
      <TextInput
        mode='outlined'
        label='New Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        style={styles.textInput}
        theme={{ colors: { primary: theme.colors.primary } }}
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
        label='Confirm New Password'
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry={!showPasswordConfirm}
        style={styles.textInput}
        theme={{ colors: { primary: theme.colors.primary } }}
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
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button
        mode='contained'
        onPress={handleSubmitReset}
        disabled={resetPending}
        style={styles.button}
      >
        {resetPending ? <ActivityIndicator color='white' /> : 'Reset Password'}
      </Button>
      <View style={styles.linkContainer}>
        <Button mode='text' onPress={() => navigation.navigate('SignIn')}>
          Remember your password? Sign In
        </Button>
      </View>
    </ScrollView>
  );
}

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
    marginBottom: 15,
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
