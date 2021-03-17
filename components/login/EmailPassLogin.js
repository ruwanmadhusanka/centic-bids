import React,{ useState } from 'react'
import { View,Text, Button ,TextInput } from 'react-native'
import auth from '@react-native-firebase/auth';
import FirebaseAuth from '../firebaseAuth'

const EmailPassLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
  
    const login = () => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
  
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
  
          console.error(error);
        });
    }
  
  

    return (
        <View>
         <View>
      <Text>Hello World</Text>
   
      <Text>email</Text>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => setEmail(text)}
      defaultValue={email}
    />
     <Text>password</Text>
    <TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
    onChangeText={text => setPassword(text)}
    defaultValue={password}
  />


      <Button title="login" onPress={login} />
     
    </View>
        </View>
    )
}

export default EmailPassLogin
