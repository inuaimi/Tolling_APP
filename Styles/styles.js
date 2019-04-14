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
    marginTop: 55
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
  profileText: {
    fontWeight: 'bold', 
    fontSize: 18,
    marginLeft: '15%', 
  },
  profileTextMargin: {
    fontWeight: 'bold', 
    fontSize: 18, 
    marginLeft: '15%', 
    marginTop: 25
  }
});