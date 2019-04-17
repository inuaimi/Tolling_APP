import React from 'react';
import {
  Text, View, ImageBackground
} from 'react-native';

import styles from '../Styles/loginStyles'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';



export default class SecondScreen extends React.Component {
  render() {
    return (
        <ImageBackground style ={styles.backgroundImage} source = {require('../Src/images/BackgroundPicLoginScreen.jpg')}>
            <View>
                <Text style = {styles.title}>Sign in</Text>
            </View>
            
            <View style = {styles.container1}>
                <TextInput
                    style = {styles.inputFieldEmail}
                    placeholder = {'Email'}
                    placeholderTextColor ={'white'}
                    keyboardType = 'email-address'
                />
                <TextInput
                    style = {styles.inputFieldPw}
                    placeholder = {'Password'}
                    placeholderTextColor ={'white'}
                    secureTextEntry =  {true} 
                />
            
                <TouchableOpacity style = {styles.loginBtnContainer}>
                    <Text style = {styles.buttonText}>LOG IN</Text>
                </TouchableOpacity>

                <Text style = {styles.forgotPw}>Forgot password | <Text onPress={()=>{Alert.alert('You tapped signup');}} style = {styles.signupText}>Sign Up</Text></Text>

                


            </View>

        </ImageBackground>
        
        
        
    );
  }
}