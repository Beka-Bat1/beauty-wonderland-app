import React from 'react';
import {StyleSheet} from 'react-native';

import {Heading} from './Heading';
import {Input} from './Input';
import {FilledButton} from './FilledButton';
import {Error} from './Error';
import {IconButton} from './IconButton';
import {AuthContainer} from './AuthContainer';
import {AuthContext} from './AuthContext';
import {Loading} from './Loading';

export function RegistrationScreen({navigation}) {
  const {register} = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('bithovendev@gmail.com');
  const [password, setPassword] = React.useState('abc');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  return (
    <AuthContainer>
      <IconButton
        style={styles.closeIcon}
        name={'close-circle-outline'}
        onPress={() => {
          navigation.pop();
        }}
      />
      <Heading style={styles.title}>REGISTRATION</Heading>
      <Error error={error} />
      <Input
        style={styles.input}
        placeholder={'Email'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        style={styles.input}
        placeholder={'Password'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <FilledButton
        title={'Register'}
        style={styles.loginButton}
        onPress={async () => {
          try {
            setLoading(true);
            await register(email, password);
            navigation.pop();
          } catch (e) {
            setError(e.message);
            setLoading(false);
          }
        }}
      />
      <Loading loading={loading} />
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 48,
  },
  input: {
    marginVertical: 8,
  },
  loginButton: {
    marginVertical: 32,
  },
  closeIcon: {
    position: 'absolute',
    top: 60,
    right: 16,
  },
});