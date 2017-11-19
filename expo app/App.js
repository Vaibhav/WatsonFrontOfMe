import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Vibration } from 'react-native';
import { ImagePicker,Speech } from 'expo';

//this line fixes a bug
let RCTLog = require('RCTLog');

let API_KEY = '8d7aced8efa9ce11cca985d203dce5989cc20148';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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

/* old return stuff
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
 
 */


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={require('./assets/logo.png')}
        />
        <Button style={styles.button}
        title="Take a picture"
        onPress={
          this._takeImage}
      />
      </View>
    );
    /*
     <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
    */
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
     Vibration.vibrate();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3]
    });

    let resultURI = await result.uri;

    //console.log(result);
    let watsonResult = await watsonGet(resultURI);
    console.log(JSON.stringify(watsonResult));
    Expo.Speech.speak(createResponse(watsonResult));
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
    // var returnJSON = JSON.parse(returnJson);
    var arr = returnJSON; //images[0].classifiers[0].classes[0];
    console.log(arr);

    var arr1 = {}; // new Array(arr.length);
    for (i = 0; i < arr.length; ++i) {
      var name = String(arr[i].class);
      if (name.indexOf("color") >= 0){ continue; }
      arr1[name] = arr[i].score;
    }

    console.log(arr1);
    let top3arr = new Set();
    // var top3arr = [];
    var top3arrNum = [];
    var curMax = 0; 
    var curClassString;

    for (i in arr1){
      if (arr1[i] > curMax && !top3arr.has(i)){
        curClassString = i; 
        curMax = arr1[i]; 
      }
    }

    top3arr.add(curClassString);
    top3arrNum.push(curMax);
    curMax = 0;

     for (i in arr1){
      if (arr1[i] > curMax && !top3arr.has(i)){
        curClassString = i; 
        curMax = arr1[i]; 
      }
    }


    top3arr.add(curClassString);
    top3arrNum.push(curMax);
    curMax = 0;

    for (i in arr1){
      if (arr1[i] > curMax && !top3arr.has(i)){
        curClassString = i; 
        curMax = arr1[i]; 
      }
    }

    top3arr.add(curClassString);
    top3arrNum.push(curMax);

    console.log(top3arr);
    console.log(top3arrNum);

    curMax = 0;
  
  var outputString ="";
  var runningString ="";
  
  
  //get iterator:
  var it = top3arr.values();
  //get first entry:
  var first = it.next();
  //get value out of the iterator entry:
  var value = first.value;
  console.log(value); //1

  runningString = "I " + confInterval(top3arrNum[0]) + " that there is a " + first.value; 
  first = it.next(); 
  if(top3arrNum.length > 1 && first.value){ 
  runningString += " it could also be a " + first.value; }
  first = it.next();
  if (top3arrNum.length > 2 && first.vlaue){
    runningString += " or a " +  first.value + " in front of you.";
  }
  
  outputString = runningString;
  /*var outputString = "I " + 
  confInterval(top3arrNum[0]) + 
  " that there is a " + top3arr[0] + 
  " it could also be a " + top3arr[1] + " or a " +   
  top3arr[2] + " in front of you."*/
  
  console.log(outputString);
  return outputString;
}

/*
class WatsonClassify extends React.Component{


  render() {
    return (<Text>Aiya wo de ni ta ta grat tsts he te lol godn</Text>);
  }
}
*/

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
    backgroundColor: '#afeeee',
    justifyContent: 'flex-end',
  },
  button:
  {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
