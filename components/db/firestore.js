import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const Firestore = () => {

    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users


    useEffect(() => {
        const subscriber = firestore()
            .collection('users')
            .onSnapshot(querySnapshot => {
                const users = [];

                querySnapshot.forEach(documentSnapshot => {
                    users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setUsers(users);
                setLoading(false);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    // console.log(users)
    if (loading) {
        return <ActivityIndicator />;
    }


    const bidItem = (item) => {
        alert("name" + item.name + " " + item.age);


    }

    return (
        <View style={{ padding: 5 }} >
            <Text>firestore data</Text>

            {/* <Button title="getUser" onPress={()=>getUser}/> */}
            <View style={{}}>
                <FlatList
                    data={users}
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                    renderItem={({ item }) => (


                        <Card onPress={() => { bidItem(item) }}>
                            {/* <Card.Title title="Card Title" subtitle="Card Subtitle"  /> */}
                            <View style={{ margin: 10, backgroundColor: 'blue' }}>
                                <Card.Content>
                                    <Title>User Name: {item.name}</Title>
                                    <Paragraph>User Age: {item.age}</Paragraph>
                                </Card.Content>
                                <Card.Cover source={{ uri: item.img }} />
                                <Card.Actions>
                                    <Button>Cancel</Button>
                                    <Button>Ok</Button>
                                </Card.Actions>
                            </View>
                        </Card>


                    )
                    }
                />
            </View>
        </View>
    )
}

export default Firestore
