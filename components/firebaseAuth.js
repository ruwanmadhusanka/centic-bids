import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('logger')

  } catch (e) {
    // remove error
    return false
  }

  console.log('Done.')
}


const logout = () => {
  auth()
    .signOut()
    .then(() => { console.log('User signed out!'); removeValue() }
     
    );



}
// const storeData = async (value) => {
//   try {
//     const jsonValue = JSON.stringify(value)
//     await AsyncStorage.setItem('logger', jsonValue)
//     console.log("saved" + jsonValue)
//   } catch (e) {
//     console.log(e)
//   }
// } 
// const storeData = async (value) => {
//   try {
//     await AsyncStorage.setItem('logger', value)
//   } catch (e) {
//     // saving error
//   }
// }
const FirebaseAuth = () => {


  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    console.log('user data : ' + user[1])

  }

  // storeData(user)
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;




  // storeData(user);





  if (!user) {
    // storeData(user);
    return (
      <View>
        <Text>Login</Text>

      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <Text>Welcome </Text>
      <Button title="logout" onPress={logout} />
    </View>
  );
}
export default FirebaseAuth;