import React, { useEffect, useState } from 'react';
import useUniversalState from './reducers/useUniversalState';
import { Pose } from '@tensorflow-models/posenet';
import VideoWithArmature from './VideoWithArmature';
import WebcamCapture from './WebCameCapture';
import estimatePoseOnImage from './estimatePoseOnImage'
import {setPose as setPoseGlobal} from './pose';


export default function WebCamePose() {
    let [{ video }] = useUniversalState("WebCamCapture", []);
    let [pose, setPose] = useState<Pose|undefined>();
    
    if(pose){
      setPoseGlobal(pose);
    }

  
    useEffect(() => {
      const render = async () => {
        if (video) {
          setPose(await estimatePoseOnImage(video));
          window.requestAnimationFrame(render)
        }
      }
      render()
    }, [video])

    return <div style={{ position: 'relative' }}>
        <WebcamCapture />
        <VideoWithArmature pose={pose} width={video ?.width} height={video ?.height} style={{ position: 'absolute', left: 0, right: 0, width: video ?.width, height: video ?.height }} />
    </div>
}