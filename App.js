import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/navigation/Navigation';
import 'intl-pluralrules';

export default function App() {
  return <AppNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
