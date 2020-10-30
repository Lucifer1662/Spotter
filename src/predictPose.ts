import * as tf from '@tensorflow/tfjs';
import { Pose } from '@tensorflow-models/posenet';


var repnet: tf.LayersModel | undefined = undefined;
export async function loadFromLocal(name: string) {
    clearRepnet();
    repnet = await tf.loadLayersModel('localstorage://' + name);
}

export function clearRepnet(){
    if(repnet)
        repnet.dispose();
    repnet = undefined;
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
    if (repnet) {
        var poseTensor = fromPoseToTensor(pose);

        if (repnet) {
            var prediction = repnet.predict(poseTensor);

            if (!Array.isArray(prediction)) {

                var result = tf.argMax(prediction, 1);

                return result.bufferSync().get(0);
            }
        }
    }

    return undefined;
}