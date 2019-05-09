import { StyleSheet } from "react-native";

export default StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 90
  },
  title: {
    marginBottom: 20,
    marginTop: 50,
    color: "#fff",
    fontWeight: "400",
    fontSize: 32,
    textAlign: "center"
  },
  desc: {
    textAlign: "center"
  },
  backToSignInText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 15,
    textDecorationLine: "underline"
  },
  errorTextStyle: {
    color: "#ff0000",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16
  }
});
