const posenet = require('@tensorflow-models/posenet');


var net;
async function load() {
    net = await posenet.load({
        // outputStride: 8,
        // inputResolution:{height:100, width:100}});
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

    return pose;
}