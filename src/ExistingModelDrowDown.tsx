import React, { useEffect, useState } from 'react';
import getModels from './getModels';
import DropDownBox, { DropDownOption } from './DropDown/DropDownBox';

interface Props {
    parents: any[],
    onChange?: (value:any)=>void
}

export default function ExistingModelDropDown({ parents, onChange }: Props) {
    let [models, setModels] = useState<DropDownOption[]>([]);

    useEffect(() => {
        getModels().then(models => {
            var modelOptions = models.map(title => ({ title, value: { name: title, fromLocal: true } }))
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