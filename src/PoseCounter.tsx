import React, { useEffect, useState } from 'react';
import predict from './predictPose'
import useUniversalState from './reducers/useUniversalState';
import { Typography } from '@material-ui/core';
import pose from './pose';
import { setTimeout } from 'timers';

interface Props {

}

let poseId = 0;

export default function PoseCounter({ }: Props) {

    const frequency = 10;
    let [{ poseId, count, time }, setState] = useState({ poseId: 0, count: 0, time:0 });

    useEffect(() => {
        var timer = setTimeout(async () => {

            if (pose.keypoints.length > 0) {
                let pid = await predict(pose);
                var c = count;
                
                if (pid !== poseId && pid < 2 && poseId < 2){
                    c = c + 1;
                }
                setState({ poseId: pid, count:c, time: time+1 });

                
            }else{
                setState({ poseId, count, time: time+1 });
            }

        }, 1000 / frequency);

        
        return () => clearTimeout(timer);

    }, [time]);

    return (
        <div>
            {/* <Typography>{poseId}</Typography> */}
            <Typography variant="h3">{Math.floor(count/2)}</Typography>
        </div>)
}