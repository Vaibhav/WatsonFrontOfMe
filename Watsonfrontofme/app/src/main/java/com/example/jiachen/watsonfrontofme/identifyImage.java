package com.example.jiachen.watsonfrontofme;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import com.ibm.watson.developer_cloud.http.ServiceCall;
import com.ibm.watson.developer_cloud.visual_recognition.v3.VisualRecognition;
import com.ibm.watson.developer_cloud.visual_recognition.v3.model.ClassifiedImages;
import com.ibm.watson.developer_cloud.visual_recognition.v3.model.ClassifyOptions;

/**
 * Created by Vaibhav on 2017-11-18.
 */




public class identifyImage {



    public identifyImage() throws FileNotFoundException {

        VisualRecognition service = new VisualRecognition(
                VisualRecognition.VERSION_DATE_2016_05_20
        );
        service.setApiKey("8d7aced8efa9ce11cca985d203dce5989cc20148");

        InputStream imagesStream = new FileInputStream("./banana.jpg");
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

}
