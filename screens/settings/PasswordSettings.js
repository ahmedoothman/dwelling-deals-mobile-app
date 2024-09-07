import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  TextInput,
  Snackbar,
  ActivityIndicator,
  Text,
  Card,
} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { changePasswordService } from '../../services/userService';

function PasswordSettings() {
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async () => {
    if (password !== passwordConfirm) {
      setSnackbarMessage('Passwords do not match');
      setSnackbarSeverity('error');
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);
    const response = await changePasswordService(
      currentPassword,
      password,
      passwordConfirm
    );
    if (response.status === 'success') {
      setSnackbarMessage('Password changed successfully!');
      setSnackbarSeverity('success');
      setTimeout(() => {
        navigation.navigate('SignIn');
      }, 2000);
    } else {
      setSnackbarMessage(response.message || 'Error occurred');
      setSnackbarSeverity('error');
    }
    setSnackbarVisible(true);
    setLoading(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarVisible(false);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title='Password Settings' />
        <Card.Content>
          <TextInput
            label='Current Password'
            mode='outlined'
            value={currentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
            secureTextEntry
            style={styles.input}
          />
          <TextInput
            label='New Password'
            mode='outlined'
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input}
          />
          <TextInput
            label='Confirm New Password'
            mode='outlined'
            value={passwordConfirm}
            onChangeText={(text) => setPasswordConfirm(text)}
            secureTextEntry
            style={styles.input}
          />
          <Button
            mode='contained'
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Submit
          </Button>
        </Card.Content>
      </Card>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleCloseSnackbar}
        duration={4000}
        style={
          snackbarSeverity === 'success'
            ? styles.successSnackbar
            : styles.errorSnackbar
        }
      >
        <Text>{snackbarMessage}</Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    padding: 20,
    borderRadius: 10,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  successSnackbar: {
    backgroundColor: 'green',
  },
  errorSnackbar: {
    backgroundColor: 'red',
  },
});

export default PasswordSettings;
