import { Link, router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Bottom, LogoBanner, PrimaryButton, Screen, TextInput } from '../components';
import { login } from '../api';

export default function Login() {
  // hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // functions
  const onLoginPress = async () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    const [response, error] = await login({ email, password });
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push('/map');
  };

  return (
    <Screen>
      <LogoBanner />
      <Bottom>
        <Text style={styles.welcomeBack}>Welcome Back</Text>
        <Text style={styles.loginText}>Login to your account</Text>
        <Text style={{ color: 'red' }}>{error}</Text>
        <View style={styles.formContainer}>
          <TextInput placeholder='Email' onChangeText={setEmail} autoCapitalize='none' />
          <TextInput
            placeholder='Password'
            onChangeText={setPassword}
            passwordRules='required: upper; required: lower; required: digit; minlength: 8'
            secureTextEntry
            autoCapitalize='none'
          />
        </View>
        <PrimaryButton
          text={loading ? 'Logging In...' : 'Log In'}
          onPress={onLoginPress}
          disabled={loading}
        />
        <View style={styles.toRegister}>
          <Text>Don't have an account? </Text>
          <Link href='/register' style={{ color: '#E06547' }}>
            Create Account
          </Link>
        </View>
      </Bottom>
    </Screen>
  );
}

const styles = StyleSheet.create({
  welcomeBack: {
    fontSize: 30,
    marginTop: 15,
  },
  loginText: {
    fontSize: 18,
    marginTop: 15,
  },
  formContainer: {
    gap: 27,
    marginTop: 55,
    marginBottom: 30,
    paddingHorizontal: 55,
    width: '100%',
  },
  toRegister: {
    flexDirection: 'row',
    marginBottom: 45,
  },
});
