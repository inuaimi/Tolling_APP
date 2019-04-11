import { StyleSheet } from 'react-native';
import { black } from 'ansi-colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#FFF',
  },
  profileBody: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    margin: 45,
  },
});