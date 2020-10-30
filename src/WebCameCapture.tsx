import React from 'react';
import Webcam from 'react-webcam';
import useUniversalState from './reducers/useUniversalState';

const videoConstraints = {
    facingMode: "user",
    width: 600,
    height: 500
};

interface Props {
    parents?: any[]
}

export default function WebcamCapture({ parents=[] }: Props) {
    let s = useUniversalState("WebCamCapture", parents);
    var setVideo = s[1];

     const webcamRef = React.useCallback(
        (current) => {            
            if (current) {
                //@ts-ignore
                var video = current.video
                video.onloadedmetadata = () => {
                    setVideo({video})
                };
            }else{
                setVideo(undefined)
            }
        },
        // eslint-disable-next-line
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