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
 function confInterval(confLevel){
  var sureness;
  if(confLevel >= 0 && confLevel <= 0.49){
   sureness = "am unsure";
}else if ( confLevel > 0.49 && confLevel <= 0.79){
sureness = "believe";
} else {
sureness = "am confident";
}
return sureness;
}

  function createResponse(returnJSON){
    const jsObj = JSON.parse(returnJson);
    var arr = jsObj.images[0].classifiers[0].classes[0];
    var arr1 = new Array(arr.length);
    for (i = 0; i < arr.length; ++i) {
      arr1[arr[i].class] = arr[i].score; //** 
    }
    
    var top3arr;
    var top3arrNum;
    var curMax = 0; 
    var curClassString;
    for (i in arr1){
      if (arr1[i] > curMax && !top3arr.includes(i)){
        curClassString = i; 
        curMax = arr1[i]; 
      }
    }
    top3arr.push(curClassString);
    top3arrNum.push(curMax);
     for (i in arr1){
      if (arr1[i] > curMax && !top3arr.includes(i)){
        curClassString = i; 
        curMax = arr1[i]; 
      }
    }
    top3arr.push(curClassString, curMax);
    top3arrNum.push(curMax);
    curMax = 0;
    for (i in arr1){
      if (arr1[i] > curMax && !top3arr.includes(i)){
        curClassString = i; 
        curMax = arr1[i]; 
      }
    }
    top3arr.push(i);
    top3arrNum.push(curMax);
    curMax = 0;
  
  var outputString = "I " + confLevel(top3arrNum[0]) + " that there is a " + top3arr[0] + " and I " + confLevel(top3arrNum[1]) + " that there is a " + top3arr[1] + " and I " + confLevel(top3arrNum[2]) + " that there is a " + top3arr[2] + " infront of you." 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
