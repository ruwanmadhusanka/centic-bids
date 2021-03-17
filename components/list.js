import React, { useState, useEffect, useReducer } from 'react'
import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from "./listItem";
import LoginScreen from "./login";
import FirebaseAuth from './firebaseAuth'

import GoogleSignInm from './login/googleSignIn'



import firestore from '@react-native-firebase/firestore';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [items, setItems] = useState([]); // Initial empty array of items
    const [logger, setLogger] = useState(false);
  
    useEffect(() => {

        console.log('render')

        const subscriber = firestore()
            .collection('items')
            .onSnapshot(querySnapshot => {
                const items = [];

                querySnapshot.forEach(documentSnapshot => {
                    items.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setItems(items);
                console.log(items)
                setLoading(false);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();


    }, []);

    // console.log(users)
    if (loading) {
        return <ActivityIndicator />;
    }







    const getData1 = async () => {
        try {
            // let jsonValue = await AsyncStorage.getItem('logger')
            // var a =await AsyncStorage.getItem('logger')
            let value = await AsyncStorage.getItem('logger')
            console.log("a = " + value)
            if (value != null) {
                setLogger(true)
            } else {
                setLogger(false)
            }

        } catch (e) {
            console.log(e)
        }
    }



    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem('logger')
        } catch (e) {
            // remove error
        }

        console.log('Done.')
      
    }



  

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="check" onPress={getData1}>check</Button>
            <Button title="check" onPress={removeValue}>Remove</Button>
           
            <FirebaseAuth />
            <GoogleSignInm />
          
            <FlatList
                data={items}
                renderItem={({ item }) => (

                    <View style={{ padding: 10 }}>
                        <Card style={{ width: 350, alignContent: 'center' }} onPress={() => {
                            /* 1. Navigate to the Details route with params */

                            // getData1();




                            // if (logger == false) {
                                // alert('please login')
                                // console.log(logger)
                                // navigation.navigate('Login')
                            // } else {
                                console.log(logger)
                                navigation.navigate('Details', {
                                    title: item.title,
                                    imageUrl: item.imageUrl,
                                    description: item.description,
                                    latestBid: item.latestBid,
                                    basePrice: item.basePrice,
                                    endTime: item.endTime.toString(),
                                    itemKey:item.key

                                });
                            // }





                        }}>
                            {/* <Card.Title title="Card Title" subtitle="Card Subtitle"  /> */}
                            <View style={{ margin: 5, padding: 5, backgroundColor: '#fff' }}>
                                <Card.Content>
                                    <Title>{item.title}</Title>
                                    

                                </Card.Content>
                                <Card.Cover source={{ uri: item.imageUrl }} />
                                <Card.Actions>
                                    <Card.Content>
                                        <Title>Latest Bid: ${item.latestBid}</Title>

                                    </Card.Content>
                                </Card.Actions>
                            </View>
                        </Card>

                    </View>
                )
                }
            />


        </View>
    );
}



const Stack = createStackNavigator();
export default function List() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="CenticBids" component={HomeScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
