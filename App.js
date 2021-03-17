import React, { useState } from 'react'
import { View, Text, Button ,TextInput} from 'react-native'

import FirebaseAuth from './components/firebaseAuth'
import EmailPassLogin from './components/login/EmailPassLogin'
import GoogleSignInm from './components/login/googleSignIn'
import Firestore from './components/db/firestore'
import List from "./components/list";

const App = () => {


  return (
   <>
     {/* <Text>App component</Text> */}
     {/* <EmailPassLogin/> */}
     {/* <GoogleSignInm/> */}
     

   
     {/* <Firestore/> */}
<List/>
   
   </>
  )
}

export default App
