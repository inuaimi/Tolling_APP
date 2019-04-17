import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'stretch',
     
    },
    container1: {
        backgroundColor: 'rgba(160, 204, 242, .4)',
        flex: 1,
    },
    title: {
        marginTop: 150,
        fontSize: 40,
        textAlign: 'center',
        margin: 10,

        color: 'white'
        
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
    }
    
});