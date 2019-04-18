import { StyleSheet } from 'react-native';

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
  },
  itemInput: {
    height: 50,
    padding: 4,
    margin: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor:'#2ed573',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  itemtext: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
  }
});