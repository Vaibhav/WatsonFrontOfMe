import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { ImagePicker,Speech } from 'expo';

//this line fixes a bug
let RCTLog = require('RCTLog');

let API_KEY = '8d7aced8efa9ce11cca985d203dce5989cc20148';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'blue'}}></Text>
        <ImagePickerExample/>
        <WatsonClassify/>
      </View>
    );
  }
}

class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        <Button
          title="Take an image with camera"
          onPress={this._takeImage}
        />
        <Button
          title="Take an image with cameraaaa"
          onPress={this._textToSpeech}
        />

        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          //<Text source={{ uri: image}} />
          }
          <Text>{image}</Text> 
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3]
    });

    let resultURI = await result.uri;

    //console.log(result);
    let watsonResult = await watsonGet(resultURI);
    console.log(watsonResult);
    //THIS IS THE JSON THAT IS RETURNED

    if (!result.cancelled) {
      this.setState({ image: result.uri });

    }
    };
    
  _textToSpeech = () => {
    Expo.Speech.speak("Text to speech. We Are Garbage."
 /*
      language: this.state.selectedExample.language
     ,
      pitch: this.state.pitch,
      rate: this.state.rate,
      onStart: start,
      onDone: complete,
      onStopped: complete,
      onError: complete,
*/
    );
  };
}

class WatsonClassify extends React.Component{


  render() {
    return (<Text>Aiya wo de ni ta ta grat tsts he te lol godn</Text>);
  }
}

async function watsonGet(image_uri){

  console.log("Image is " + image_uri);

  let photo = { 
    uri: image_uri, 
    name: 'image.jpg', 
    type: 'image/jpg'
  }
  let formdata = new FormData();
  formdata.append('images_file', photo);

  let data = await fetch('https://watson-api-explorer.mybluemix.net/visual-recognition/api/v3/classify?api_key=8d7aced8efa9ce11cca985d203dce5989cc20148&version=2016-05-20', 
  {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept' : 'application/json',
      'Accept-Language' : 'en'
    },
    body: formdata
  }).then(response => {
    //console.log(response);
    return response;
  }).catch(err => {
    console.log(err);
  })

  //return text_response;
  //console.log(data);
  let actual_response = await data.json();
  //console.log(actual_response);
  return actual_response.images[0].classifiers[0].classes;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
