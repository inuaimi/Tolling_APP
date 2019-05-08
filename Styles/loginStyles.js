import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'stretch',
     
    },
    container1: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(160, 204, 242, .4)'
    },
    title: {
        marginBottom: 30,
        color: '#fff',
        fontWeight: '400',
        fontSize: 32,
        
    },
    backgroundContainer:{
        alignItems:'center',
       
        
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        
    
        
    },
    inputFieldEmail: {
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor:'#222',
        color: 'white',
        marginHorizontal: 25,
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 50

    },
    inputFieldPw: {
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor:'#222',
        color: 'white',
        marginHorizontal: 25,
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 30

    },
    loginBtnContainer: {
        backgroundColor: 'white',
        paddingVertical: 15,
        borderRadius: 25,
        marginHorizontal: 25,
        marginTop: 20
        
    },
    buttonText: {
        color: 'black',
        textAlign: 'center'
    },

    forgotPw: {
        textAlign: 'center',
        color: 'white',
        marginVertical: 20,
        fontSize: 20
    
    },
    signupText: {
        color: 'black'
    },
    
    errorTextStyle: {
        color: '#ff0000',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 16,
    }

    
});
