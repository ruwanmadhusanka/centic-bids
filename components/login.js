// import React from 'react'
import { View, Text,Button } from 'react-native'
import EmailPassLogin from './login/EmailPassLogin'
// import GoogleSignInm from './login/google/SignIn'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React,{useState} from 'react';
// import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


storeData = async () => {
    try {
      await AsyncStorage.setItem('logger', 'val')
    } catch (e) {
      // saving error
    }
  }
  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  GoogleSignin.configure({
    webClientId: '1072813917582-4h4bvmjnp98gb3jg8rudubcffn3jn5ac.apps.googleusercontent.com',
  });
  const LoginScreen = ()=> {
    
    return (

        <>
<View style={{justifyContent:'center',flex:1,alignContent:'center',alignItems:'center',padding:20}}>
        <Text style={{fontSize:30}}><Text>To Bid for the item,</Text> Please Login</Text>
        </View>
      <Button
        title="Google Sign-In"
        onPress={() => onGoogleButtonPress().then(() => {console.log('Signed in with Google!');
        storeData()
      
      })}
      />
      </>
    );
  }

export default LoginScreen
