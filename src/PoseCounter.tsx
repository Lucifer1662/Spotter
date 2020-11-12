import React, { useEffect, useState } from 'react';
import predict from './predictPose'
import { Typography } from '@material-ui/core';
import pose from './pose';
import { setTimeout } from 'timers';
import useUniversalState from './reducers/useUniversalState';

interface Props {
    parents?: any[]
}

export default function PoseCounter({ parents = [] }: Props) {

    const frequency = 5;
    let [{ poseId, count, time }, setState] = useUniversalState<{ poseId: number | undefined, count: number, time: number }>(
        "PoseCounter", [],
        { poseId: 0, count: 0, time: 0 });




    useEffect(() => {
        var timer = setTimeout(async () => {

            if (pose.keypoints.length > 0) {
                let pid = await predict(pose);

                var c = 0;

                if (pid !== undefined && poseId !== undefined && pid !== poseId && pid < 2 && poseId < 2) {
                    c = 1;
                }
                
                setState((prev:any)=>({ poseId: pid, count: prev.count + c, time: prev.time + 1 }));


            } else {
                setState({ poseId, count, time: time + 1 });
            }

        }, 1000 / frequency);


        return () => clearTimeout(timer);

    }, [time]);

    return (
        <div>
            {/* <Typography>{poseId}</Typography> */}
            <Typography color="primary" variant="h3">{Math.floor(count / 2)}</Typography>
        </div>)
}