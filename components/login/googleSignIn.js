import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React,{useState} from 'react';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

storeData = async () => {
  try {
    await AsyncStorage.setItem('logger', 'val')
  } catch (e) {
    // saving error
  }
}
GoogleSignin.configure({
    webClientId: '1072813917582-4h4bvmjnp98gb3jg8rudubcffn3jn5ac.apps.googleusercontent.com',
  });
  function GoogleSignInm() {
    
    return (
      <Button
        title="Google Sign-In"
        onPress={() => onGoogleButtonPress().then(() => {console.log('Signed in with Google!');
        storeData()
      
      })}
      />
    );
  }
async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
console.log(idToken)
console.log(googleCredential)

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export default GoogleSignInm;