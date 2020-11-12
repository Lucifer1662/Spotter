import React, { useEffect, useState } from 'react';
import getModels, { getPublicModels } from './getModels';
import DropDownBox, { DropDownOption } from './DropDown/DropDownBox';

interface Props {
    parents: any[],
    onChange?: (value:any)=>void
}

export default function ExistingModelDropDown({ parents, onChange }: Props) {
    let [models, setModels] = useState<DropDownOption[]>([]);

    useEffect(() => {
        getModels().then(async models => {
            var modelOptions = models.map(({name, load}:any)=>({title:name, value:{name, load}})) 
           
            setModels(["No Model", ...modelOptions])
        });
    }, []);

    return <DropDownBox name="model" title="Model" parents={parents} values={models}
        onChange={(value: any) => {
            if(onChange)
                onChange(value)
        }}
    />
}