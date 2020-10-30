import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import useUniversalState from './reducers/useUniversalState';
import { TextField, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { trainModelFromStorage } from './trainRepRecognition';
import ExistingModelDropDown from './ExistingModelDrowDown';
import { XAxis, CartesianGrid, Line, LineChart, Tooltip, YAxis } from 'recharts'

interface Props {
    parents?: any[]
}

export default function TrainModel({ parents = [] }: Props) {
    let myName = "TrainModel";

    let [{ name, posess, existingModel, existingModelSelect }, setState] = useUniversalState<any>(myName, parents, {
        posess: undefined,
        name: '',
        existingModel: false,
        existingModelSelect: undefined,
        
    });

    let [infos, setInfos] = useState<any[]>([]);

    parents = [...parents, myName];

    const trainProgress = (info: tf.History) => {
        setInfos(prevInfos => ([...prevInfos, {loss: info.history.loss[0], time: prevInfos.length} ]) );
    }

    const onSubmit = () => {
        if (!existingModel && name === '') {
            alert("Please pick a name for this model");
            return;
        }

        if (existingModel && (!existingModelSelect || existingModelSelect.name === "No Model")) {
            alert("Please pick an existing model");
            return;
        }

        if (posess) {
            if (existingModel) {
                if (existingModelSelect.fromLocal) {
                    trainModelFromStorage(existingModelSelect.name, posess, trainProgress);
                }
            } else {
                trainModelFromStorage(name, posess, trainProgress);
            }

        }
        else
            alert("Please pick training data")
    }

    const newName = <TextField label="Name" style={{background: undefined}} color='primary' variant="standard" onChange={(e) => setState({ name: e.target.value })} />


    const existingModelDropDown = <ExistingModelDropDown parents={parents} onChange={(e) => setState({ existingModelSelect: e })} />

    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        <FormControlLabel
            control={<Checkbox name="existingModel" value={existingModel} onChange={(e) => setState({ existingModel: e.target.checked })} />}
            label="Existing Model"
        />
        {existingModel ? existingModelDropDown : newName}
        <input type='file' accept=".json" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e ?.target ?.files) {
                if (e ?.target ?.files.length > 0) {
                    var file = e ?.target ?.files[0];
                    var reader = new FileReader();
                    reader.onload = (event) => {
                        if (event ?.target ?.result) {
                            //@ts-ignore
                            var posess = JSON.parse(event.target.result);

                            setState({ posess })
                        }

                    };
                    reader.readAsText(file);

                }


            }
        }} />
        <Button variant='contained' onClick={onSubmit}>Train</Button>
        <LineChart
            width={400}
            height={400}
            data={infos}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
            <XAxis dataKey="time" label="Time" />
            <YAxis dataKey="loss" label="Loss" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="loss" stroke="#ff7300" />
        </LineChart>

    </div>
}