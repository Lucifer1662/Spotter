import {promises as fs} from 'fs'


async function run(){
    let fileNames = await fs.readdir('./public/models/');
    var modelNames = fileNames.filter(fileName=>fileName.endsWith(".json"));
    await fs.writeFile('./src/publicModelNames.json', JSON.stringify(modelNames));
}   

run();