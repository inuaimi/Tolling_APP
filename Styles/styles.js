import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "#FFF"
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    margin: 10
  },
  map: {
    flex: 5,
    justifyContent: "center",
    backgroundColor: "#2ed573"
  },

  // #bottomDetails
  bottomDetailsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#FFF"
    },
  bottomDetailsKeys: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    // backgroundColor: '#ff7f50'
  },
  bottomDetailsValues: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center"
    // backgroundColor: '#eccc68'
  },
  bottomDetailsKeyTextLeft: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 65,
    marginTop: 25,
    marginRight: 65
  },
  bottomDetailsKeyText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 65,
    marginTop: 25,
  },
  bottomDetailsValueTextLeft: {
    fontSize: 14,
    textAlign: "center",
    marginLeft: 65,
    marginTop: 15,
    marginRight: 65
    
  },
  bottomDetailsValueText: {
    fontSize: 14,
    textAlign: "center",
    marginRight: 65,
    marginTop: 15
  },
  itemInput: {
    height: 50,
    padding: 4,
    margin: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    color: "black"
  },
  buttonText: {
    fontSize: 18,
    color: "#111",
    alignSelf: "center"
  },
  button: {
    height: 45,
    flexDirection: "row",
    backgroundColor: "#2ed573",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  itemsList: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  itemtext: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center"
  }
});
