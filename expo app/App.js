import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { ImagePicker,Speech } from 'expo';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'blue'}}>Hello</Text>

        <ImagePickerExample/>
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
      aspect: [4, 3],
    });

    console.log(result);

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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
