import React, { useEffect, useState } from 'react';
import predict from './predictPose'
import { Typography } from '@material-ui/core';
import pose from './pose';
import { setTimeout } from 'timers';

interface Props {

}

export default function PoseCounter() {

    const frequency = 5;
    let [{ poseId, count, time }, setState] = useState<{poseId:number|undefined, count:number, time:number}>({ poseId: 0, count: 0, time:0 });

    useEffect(() => {
        var timer = setTimeout(async () => {

            if (pose.keypoints.length > 0) {
                let pid = await predict(pose);
                
                var c = 0;
                
                if (pid !==undefined && poseId!==undefined && pid !== poseId && pid < 2 && poseId < 2){
                    c = 1;
                    console.log(pid)
                }
                

                setState((prev)=>({ poseId: pid, count:prev.count+c, time: prev.time+1 }));

                
            }else{
                setState({ poseId, count, time: time+1 });
            }

        }, 1000 / frequency);

        
        return () => clearTimeout(timer);

    }, [time, count, poseId]);

    return (
        <div>
            {/* <Typography>{poseId}</Typography> */}
            <Typography color="primary" variant="h3">{Math.floor(count/2)}</Typography>
        </div>)
}