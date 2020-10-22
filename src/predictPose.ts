import * as tf from '@tensorflow/tfjs';
import { Pose } from '@tensorflow-models/posenet';
import { func } from '@tensorflow/tfjs-data';



var repnet: tf.LayersModel | undefined = undefined;
async function load() {
    repnet = await tf.loadLayersModel('localstorage://my-model-5');
}


export function fromPoseToArray(pose: Pose) {
    var positions = pose.keypoints.map(keypoint => {
        return [keypoint.position.x / 600, keypoint.position.y / 600];
    }).reduce((l, r) => r.concat(l));

    return positions;
}

export function fromPoseToTensor(pose: Pose) {
    var data = fromPoseToArray(pose);
    return tf.tensor(data, [1, data.length]);
}

export function fromPosesToArrays(poses: Array<Pose>) {
    return poses.map(pose => fromPoseToArray(pose));
}

export function fromPosesToTensor(poses: Array<Pose>) {
    var data = fromPosesToArrays(poses);
    return tf.tensor(data);
}


export default async function predict(pose: Pose) {
    // load the posenet model from a checkpoint
    if (!repnet) {
        await load()
    }

    var poseTensor = fromPoseToTensor(pose);

    if (repnet) {
        var prediction = repnet.predict(poseTensor);

        if (!Array.isArray(prediction)) {
           
            var result = tf.argMax(prediction, 1);
    
            return result.bufferSync().get(0);
        }
    }

    return 0;
}