import React, { useState, useEffect } from 'react';
import PoseCounter from './PoseCounter';
import WebCamPose from './WebCamPose';
import getModels from './getModels';
import DropDownBox, { DropDownOption } from './DropDown/DropDownBox';
import { loadFromLocal, clearRepnet } from './predictPose';

export default function CountReps() {
    let myName = "CountReps";
    let parents = [myName];

    let [models, setModels] = useState<DropDownOption[]>([]);

    useEffect(() => {
       getModels().then(models => {
        var modelOptions = models.map(title=>({title, value:{name:title, fromLocal:true}}))   
        setModels(["No Model",...modelOptions])
    });
    }, []);



    return <div>
        <PoseCounter />
        <WebCamPose parents={parents} />
        <DropDownBox name="model" title="Model" parents={parents} values={models}
        onChange={(value:any)=>{
            console.log(value)
            if(value.fromLocal)
                loadFromLocal(value.name);
            else
                clearRepnet();
                
        }}
        />
    </div>
}