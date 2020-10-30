
const tensorflowPath: string = "tensorflowjs_models/";

export default async function getModels() {

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