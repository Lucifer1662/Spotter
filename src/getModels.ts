import * as tf from '@tensorflow/tfjs'
const tensorflowPath: string = "tensorflowjs_models/";
const publicModelNames = require("./publicModelNames.json");

export default async function getModels() {

    let publicModels = await getPublicModels();
    let localModels = await getLocalModels();

    return [...publicModels, ...localModels];
}

export async function getLocalModelNames() {

    let modelNames: string[] = []

    for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key && key.startsWith(tensorflowPath)) {
            let name = key.substr(tensorflowPath.length);
            let slashi = name.search("/");
            if (slashi !== -1)
                name = name.substr(0, slashi);
                
            if (!modelNames.some((v) => v === name))
                modelNames.push(name);
        }
    }

    // let models = await Promise.all(modelNames.map(async name => ({name, model: await tf.loadLayersModel('localstorage://'+name)})));
    modelNames.map(s=>'localstorage://'+s);

    return modelNames;
}

export async function getLocalModels(){
    var names = await getLocalModelNames();
    return Promise.all(names.map(async name=>({name:"local/"+name, load: () => tf.loadLayersModel("localstorage://"+name)})));
}



export function getPublicModels() {
    return Promise.all(getPublicModelNames().map(async name=>({name:"public/"+name, load: () => {
        console.log(process.env.PUBLIC_URL + '/' + name)
        return tf.loadLayersModel( 'https://still-sierra-49247.herokuapp.com/' + name)}})))
}

export function getPublicModelNames() : string[] {
    return publicModelNames;
}