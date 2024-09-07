import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  TextInput,
  Snackbar,
  ActivityIndicator,
  Text,
  Card,
} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { authActions } from '../../store/auth-slice'; // Import action to update user in Redux
import { updateMeService } from '../../services/userService';

function InfoSettings() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
    }
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);

    const response = await updateMeService(name, email, phoneNumber);
    if (response.status === 'success') {
      // Update Redux state with new user data
      dispatch(authActions.setUser(response.data));
      setSnackbarMessage('Information updated successfully!');
      setSnackbarSeverity('success');
    } else {
      setSnackbarMessage(response.message);
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
        <Card.Title title='Info Settings' />
        <Card.Content>
          <TextInput
            label='Name'
            mode='outlined'
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
          <TextInput
            label='Email'
            mode='outlined'
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            label='Phone Number'
            mode='outlined'
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
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

export default InfoSettings;
