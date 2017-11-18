package com.example.jiachen.watsonfrontofme;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import com.ibm.watson.developer_cloud.visual_recognition.v3.model.ClassifierOptions;
import com.ibm.watson.developer_cloud.visual_recognition.v3.model.ClassifyImagesOptions;
import com.ibm.watson.developer_cloud.visual_recognition.v3.model.VisualClassification;
import com.ibm.watson.developer_cloud.visual_recognition.v3.model.VisualRecogniton;

/**
 * Created by Vaibhav on 2017-11-18.
 */

//ServiceCall<ClassifiedImages> classify(ClassifyOptions classifyOptions)


public class identifyImage {
    VisualRecognition service = new VisualRecognition(
            VisualRecognition.VERSION_DATE_2016_05_20
    );
        service.setApiKey("8d7aced8efa9ce11cca985d203dce5989cc20148");

    InputStream imagesStream = new FileInputStream("./fruitbowl.jpg");
    ClassifyOptions classifyOptions = new ClassifyOptions.Builder()
            .imagesFile(imagesStream)
            .imagesFilename("fruitbowl.jpg")
            .parameters("{\"classifier_ids\": [\"fruits_1462128776\","
                    + "\"SatelliteModel_6242312846\"],"
                    + "\"owners\": [\"IBM\", \"me\"]}")
            .build();
    ClassifiedImages result = service.classify(classifyOptions).execute();
        System.out.println(result);
}
