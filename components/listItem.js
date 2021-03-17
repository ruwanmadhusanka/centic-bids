import React, { useState } from 'react';
import { ScrollView, Text, View, TextInput } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import CountDown from 'react-native-countdown-component';
import firestore from '@react-native-firebase/firestore';


const DetailsScreen = ({ route, navigation }) => {
  const { title } = route.params;
  const { imageUrl } = route.params;
  const { description } = route.params;
  const { latestBid } = route.params;
  const { basePrice } = route.params;
  const { endTime } = route.params;
  const { itemKey } = route.params;

  const [postText, setPostText] = useState(latestBid);

  const st = Date.now();
  const update = () => {


    firestore()
      .collection('items')
      .doc(itemKey)
      .update({
        latestBid: postText,
      })
      .then(() => {
        console.log('User updated!');
      });
  }

  return (

    <>
      <View>
        <ScrollView>

          <Card>
            <Card.Title title={title} subtitle="Card Subtitle" />
            <CountDown
              until={st}
              onFinish={() => alert('finished')}
              onPress={() => alert('hello')}
              size={20}
            />
            <Card.Cover source={{ uri: imageUrl }} />
            <Card.Content>
              <Title>Latest Bid : ${postText}</Title>
              <Title>Base Price : ${basePrice}</Title>
              <Title>{endTime}</Title>
              <Paragraph>{description}</Paragraph>

            </Card.Content>
            <Card.Actions>

            </Card.Actions>
          </Card>



          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setPostText(text)}
            value={postText}
          />

          <Button title="Go back" onPress={() => { setPostText(postText); update() }} >Bid</Button><Text>{postText}</Text>

          <Button title="Go back" onPress={() => navigation.goBack('CenticBids', { post: postText })} >Go back</Button>
        </ScrollView>

      </View>

    </>
  );
}
export default DetailsScreen