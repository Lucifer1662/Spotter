import React from 'react';
import Webcam from 'react-webcam';
import useUniversalState from './reducers/useUniversalState';

const videoConstraints = {
    facingMode: "user",
    width: 300,
    height: 300
};

interface Props {
    parents?: any[],
    width?:number,
    height?: number
}

export default function WebcamCapture({ parents=[], width=600, height=500 }: Props) {
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
        <div style={{ position: 'absolute', top:0, left:0, right:0, bottom:0 }}>
            <Webcam
                style={{objectFit:"cover", width:"100%", height:"100%"}}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={200}
                height={200}
                videoConstraints={videoConstraints}
            />
        </div>
    );
};