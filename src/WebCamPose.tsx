import React, { useEffect, useState } from 'react';
import useUniversalState from './reducers/useUniversalState';
import { Pose } from '@tensorflow-models/posenet';
import VideoWithArmature from './VideoWithArmature';
import WebcamCapture from './WebCameCapture';
import estimatePoseOnImage from './estimatePoseOnImage'
import { setPose as setPoseGlobal } from './pose';
import {IconButton, FormControlLabel, Checkbox} from "@material-ui/core"
import {Menu } from '@material-ui/core/'

interface Props {
  parents?: any[]
}

export default function WebCamePose({ parents = [] }: Props) {

  let [{ video }] = useUniversalState("WebCamCapture", parents);
  let [pose, setPose] = useState<Pose | undefined>();
  let [showBones, setShowBones] = useState(true);

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
    {showBones && 
    <VideoWithArmature pose={pose} width={video ?.width} height={video ?.height} style={{ position: 'absolute', left: 0, right: 0, width: video ?.width, height: video ?.height }} />
    }
    <FormControlLabel
            control={<Checkbox name="showBones" value={!showBones} onChange={(e) => setShowBones(e.target.checked)} />}
            label="Show Bones"
        />
  </div>
}