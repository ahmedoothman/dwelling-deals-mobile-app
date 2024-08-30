import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { verifyEmailService } from '../../services/userService';

export default function VerifyEmail() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [verifyPending, setVerifyPending] = useState(false);
  const navigation = useNavigation();

  const handleSubmitVerify = async () => {
    setVerifyPending(true);
    const response = await verifyEmailService(otp);
    if (response.status === 'success') {
      navigation.navigate('SignIn'); // Navigate to login page
    } else {
      setError(response.message);
    }
    setVerifyPending(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Email</Text>
      <View style={styles.form}>
        <Text style={styles.infoText}>
          Please enter the OTP sent to your email
        </Text>
        <OTPInputView
          style={styles.otpInput}
          pinCount={6}
          code={otp}
          onCodeChanged={setOtp}
          autoFocusOnLoad
          codeInputFieldStyle={styles.otpField}
          codeInputHighlightStyle={styles.otpFieldHighlight}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Button
          title={verifyPending ? 'Verifying...' : 'Verify Email'}
          onPress={handleSubmitVerify}
          disabled={verifyPending}
        />
        {verifyPending && (
          <ActivityIndicator
            style={styles.loader}
            size='large'
            color='#0000ff'
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  infoText: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  otpInput: {
    width: '80%',
    height: 60,
  },
  otpField: {
    width: 30,
    height: 45,
    borderWidth: 1,
    borderColor: '#000',
  },
  otpFieldHighlight: {
    borderColor: '#03DAC6',
  },
  errorText: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
});
