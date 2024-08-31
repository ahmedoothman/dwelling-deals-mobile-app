import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { verifyEmailService } from '../../services/userService';
import theme from '../../theme';

export default function VerifyEmail() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [verifyPending, setVerifyPending] = useState(false);
  const navigation = useNavigation();

  const handleSubmitVerify = async () => {
    if (otp.length !== 6) {
      setError('OTP must be 6 digits long');
      return;
    }
    setVerifyPending(true);
    const response = await verifyEmailService(otp);
    if (response.status === 'success') {
      navigation.navigate('Sign In'); // Navigate to login page
    } else {
      setError(response.message);
    }
    setVerifyPending(false);
  };

  const handleOtpChange = (text) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    if (sanitizedText.length <= 6) {
      setOtp(sanitizedText);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Email</Text>
      <View style={styles.form}>
        <Text style={styles.infoText}>
          Please enter the OTP sent to your email
        </Text>
        <TextInput
          mode='outlined'
          label='Enter OTP'
          value={otp}
          onChangeText={handleOtpChange}
          keyboardType='numeric'
          maxLength={6}
          style={styles.customOtpInput}
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
          onPress={handleSubmitVerify}
          disabled={verifyPending}
          style={styles.button}
        >
          {verifyPending ? 'Verifying...' : 'Verify Email'}
        </Button>
        {verifyPending && (
          <ActivityIndicator
            style={styles.loader}
            size='large'
            animating={true}
            color={theme.colors.primary}
          />
        )}
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
  customOtpInput: {
    width: '80%',
    marginBottom: 20,
  },
  button: {
    width: '60%',
    // paddingVertical: 10,
  },
  errorText: {
    marginVertical: 10,
    color: theme.colors.danger, // Use accent color from theme
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
});
