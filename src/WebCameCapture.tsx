import React, { useEffect } from 'react';
import Webcam from 'react-webcam';
import useUniversalState from './reducers/useUniversalState';

const videoConstraints = {
    facingMode: "user",
    width: 600,
    height: 500
};

interface Props {

}

export default function WebcamCapture({  }: Props) {
    let [video, setVideo] = useUniversalState("WebCamCapture", [])

     const webcamRef = React.useCallback(
        (current) => {            
            if (current) {
                //@ts-ignore
                var video = current.video
                video.onloadedmetadata = () => {
                    setVideo({video})
                };
            }
        },
        []
    );

    return (
        <div style={{ position: 'relative', display: 'unset' }}>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={600}
                height={500}
                videoConstraints={videoConstraints}
            />
        </div>
    );
};