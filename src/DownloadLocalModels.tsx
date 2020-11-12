import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import useUniversalState from './reducers/useUniversalState';
import { TextField, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { trainModelFromStorage } from './trainRepRecognition';
import ExistingModelDropDown from './ExistingModelDrowDown';
import { XAxis, CartesianGrid, Line, LineChart, Tooltip, YAxis } from 'recharts'
//@ts-ignore
import Download from '@axetroy/react-download';
import getModels from './getModels';


interface Props {
    parents?: any[]
}

export default function DownloadLocalModels({ parents = [] }: Props) {

    const download = async () => {
        var models = await getModels();
        Promise.all(models.map(async (model) => {
            //localStorage.getItem("")
            var m = await tf.loadLayersModel('localstorage://' + model);
            m.save('downloads://' + model);
        }))

    }
    return <div>
        <Button variant='outlined' onClick={download}>Download Data</Button>
    </div>
}