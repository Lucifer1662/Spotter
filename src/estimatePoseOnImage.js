import * as tf from '@tensorflow/tfjs';
const posenet = require('@tensorflow-models/posenet');
var fs = require('fs');

var net;
var repnet;
async function load() {
    net = await posenet.load();
    repnet = await tf.loadLayersModel('localstorage://my-model-1');
}




export default async function test(image) {
    // load the posenet model from a checkpoint
    if (!net) {
        await load()
    }

    const pose = await net.estimateSinglePose(image, {
        flipHorizontal: false,
        decodingMethod: 'single-person'
    });


    // Generate dummy data.
    const toData = (pose) => {
        var positions = pose.keypoints.map(keypoint => {
            return [keypoint.position.x / 600, keypoint.position.y / 600];
        }).reduce((l, r) => r.concat(l));

        return positions;

    }


    // var d = toData(pose);
    // var dt = tf.tensor(d, [1,d.length]);
    // dt.print();


    // var prediction = repnet.predict(dt);
    // prediction.print();

    return pose;
}