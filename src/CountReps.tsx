import React, { useState, useEffect } from 'react';
import PoseCounter from './PoseCounter';
import WebCamPose from './WebCamPose';
import getModels from './getModels';
import DropDownBox, { DropDownOption } from './DropDown/DropDownBox';
import { loadFromLocal, clearRepnet, loadModel } from './predictPose';
import { async } from 'q';
import { Button } from '@material-ui/core';
import useUniversalState from './reducers/useUniversalState';

export default function CountReps() {
    let myName = "CountReps";
    let parents = [myName];

    let [models, setModels] = useState<DropDownOption[]>([]);
    let [_, setCount] = useUniversalState("PoseCounter",[]);

    useEffect(() => {
       getModels().then(models => {
        var modelOptions = models.map(({name, load}:any)=>({title:name, value:{name, load}}))   
        setModels(["No Model",...modelOptions])
    });
    }, []);


    

    return <div>
        <PoseCounter/>
        <WebCamPose parents={parents} />
        <DropDownBox name="model" title="Model" parents={parents} values={models}
        onChange={async (value:any)=>{
            if(value)
                loadModel(await value.load());
            else
                clearRepnet();
                
        }}
        />
        <Button variant="contained" onClick={()=>{setCount({ count: 0 })}}>Clear</Button>
    </div>
}