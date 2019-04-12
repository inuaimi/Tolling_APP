import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  map: {
    flex: 5,
    justifyContent: 'center',
    backgroundColor: '#2ed573',
  },

  // #bottomDetails
  bottomDetailsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#FFF'
  },
  bottomDetailsKeys: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor: '#ff7f50'
  },
  bottomDetailsValues: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor: '#eccc68'
  },
  bottomDetailsKeyText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  bottomDetailsValueText: {
    fontSize: 14,
  }
});