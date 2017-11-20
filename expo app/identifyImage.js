var watson = require('watson-developer-cloud');
var fs = require('fs');

var visual_recognition = watson.visual_recognition({
  api_key: '8d7aced8efa9ce11cca985d203dce5989cc20148',
  version: 'v3',
  version_date: '2016-05-20'
});


var params = {
  images_file: fs.createReadStream('./testset/lights.jpg'),
  classifier_ids: ['banana_219129350', 'default'] 
};

visual_recognition.classify(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
    //var x = JSON.parse(res);
    console.log(res.images[0].classifiers[0].classes[0].class);
    console.log(Object.keys(res.images[0].classifiers[0].classes).length);  
});
