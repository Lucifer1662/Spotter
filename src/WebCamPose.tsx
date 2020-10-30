import React, { useEffect, useState } from 'react';
import useUniversalState from './reducers/useUniversalState';
import { Pose } from '@tensorflow-models/posenet';
import VideoWithArmature from './VideoWithArmature';
import WebcamCapture from './WebCameCapture';
import estimatePoseOnImage from './estimatePoseOnImage'
import { setPose as setPoseGlobal } from './pose';

interface Props {
  parents?: any[]
}

export default function WebCamePose({ parents = [] }: Props) {

  let [{ video }] = useUniversalState("WebCamCapture", parents);
  let [pose, setPose] = useState<Pose | undefined>();

  if (pose) {
    setPoseGlobal(pose);
  }


  useEffect(() => {

    const render = async () => {
      if (video) {
        // console.log(parents, video)
        setPose(await estimatePoseOnImage(video));

        // if(video)
        window.requestAnimationFrame(render);
      }

    }

    //if(video)
    render()
  }, [video])

  return <div style={{ position: 'relative' }}>
    <WebcamCapture parents={parents} />
    <VideoWithArmature pose={pose} width={video ?.width} height={video ?.height} style={{ position: 'absolute', left: 0, right: 0, width: video ?.width, height: video ?.height }} />
  </div>
}