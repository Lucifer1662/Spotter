
import * as tf from '@tensorflow/tfjs'
import { Pose } from '@tensorflow-models/posenet';


export async function trainModelFromStorage(name: string, states: Array<Array<Pose>>, progress?: (info: tf.History)=>void){
    const inputSize = states[0][0].keypoints.length * 2;
    const outputSize = states.length;

    try {
        var model = await tf.loadLayersModel('localstorage://' + name);
    } catch (e) {
        model = tf.sequential({
            layers: [
                tf.layers.dense({ inputShape: [inputSize], units: inputSize * 2, activation: 'sigmoid' }),
                tf.layers.dense({ units: outputSize * 2, activation: 'sigmoid' }),
                tf.layers.dense({ units: outputSize, activation: 'sigmoid' }),
            ]
        });
    }

    await train(model, states, progress);

    await model.save('localstorage://' + name);
}

export default async function train(model: tf.LayersModel, states: Array<Array<Pose>>, progress?: (info : tf.History)=>void) {
    if (!states[0])
        return;
    const inputSize = states[0][0].keypoints.length * 2;
    const outputSize = states.length;




    model.compile({
        optimizer: tf.train.sgd(0.1),
        loss: tf.losses.meanSquaredError,
    });

    // Generate dummy data.
    const toData = (poses: Array<Pose>) => {
        return poses.map((pose) => {
            var positions = pose.keypoints.map(keypoint => {
                return [keypoint.position.x / 600, keypoint.position.y / 600];
            }).reduce((l, r) => r.concat(l));

            return positions;
        });
    }

    const toLabel = (label: number, num: number) => {
        var labels = [];
        for (var i = 0; i < num; i++) {
            labels.push(label)
        }
        return labels;
    }

    const datas = states.map(data=>toData(data));
    const labelss = states.map((label,index)=>toLabel(index, label.length));

    const dataD = datas.reduce((a,b)=>a.concat(b));
    const labelsD = labelss.reduce((a,b)=>a.concat(b));



    const data = tf.tensor(dataD);
    const labels = tf.oneHot(labelsD, outputSize);



    for (let index = 0; index < 10; index++) {
        // Train for 5 epochs with batch size of 32.
        await model.fit(data, labels, {
            epochs: 10,
            batchSize: 16,
        }).then(info => {
            if(progress)
                progress(info);
        });
    }
}