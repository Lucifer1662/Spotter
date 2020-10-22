import React, { useEffect } from 'react';
import WebCamPose from './WebCamPose';
import { Button, Typography } from '@material-ui/core';
import useUniversalState from './reducers/useUniversalState';
import pose from './pose';
//@ts-ignore
import Download from '@axetroy/react-download';
import train from './trainRepRecognition';
import pose1 from './poses8.json'

enum StatesEnum {
    NotStarted = "Not Started",
    Init1Pose = "Init 1st Pose",
    Creating1Pose = "Create 1st Pose",
    Init2Pose = "Init 2nd Pose",
    Creating2Pose = "Create 2nd Pose",
    Finished = "Finished"
}

export default function CreateRep() {
    let startTime = 5;
    let [state, setState] = useUniversalState<any>("CreateRep", [], {
        startPoses: [],
        endPoses: [],
        stage: StatesEnum.NotStarted,
        time: 0,
        frequency: 1,
    });

    const trainingExamples = 100;

    var { startPoses, endPoses, stage, time, frequency } = state;
    const sampleFrequency = 20;

    useEffect(() => {
        if (time > 0) {


            var timer = setTimeout(() => {
                setState({ time: time - (1 / frequency) })
            }, 1000 / frequency)


            return () => clearTimeout(timer);
        }


       
    }, [time]);


    useEffect(()=>{
        if (stage === StatesEnum.Init1Pose && time <= 0) {
            setState({ stage: StatesEnum.Creating1Pose })
        }

        if (stage === StatesEnum.Creating1Pose && time <= 0) {

            if (startPoses.length >= trainingExamples) {
                setState({ stage: StatesEnum.Init2Pose, time: startTime, frequency: 1 })
            }
            else {
                if (pose && pose.keypoints) {

                    setState({ time: 2/sampleFrequency, frequency: sampleFrequency, startPoses: [...startPoses, pose] });
                } else {
                    setState({ time: 2/sampleFrequency, frequency: sampleFrequency });
                }

            }
        }

        if (stage === StatesEnum.Init2Pose && time <= 0) {
            setState({ stage: StatesEnum.Creating2Pose })
        }

        if (stage === StatesEnum.Creating2Pose && time <= 0) {
            if (endPoses.length >= trainingExamples) {
                setState({ stage: StatesEnum.Finished })
            }
            else {
                if (pose && pose.keypoints) {
                    setState({ time: 2/sampleFrequency, frequency: sampleFrequency, endPoses: [...endPoses, pose] });
                } else {
                    setState({ time: 2/sampleFrequency, frequency: sampleFrequency });
                }
            }
        }

    }, [time, stage])





    return <div>
        <button onClick={() => {
            train(pose1);
        }} >test</button>
        <WebCamPose />
        {stage === StatesEnum.NotStarted && <Button onClick={() => {
            setState({ stage: StatesEnum.Init1Pose, time: startTime })


        }} variant="outlined">Create new Rep</Button>}
        {stage === StatesEnum.Init1Pose &&
            <Typography variant='h3'>Starting in to create 1st Pose, get in position. {Math.floor(time)}</Typography>
        }
        {stage === StatesEnum.Init2Pose &&
            <Typography variant='h3'>Starting in to create 2nd Pose, get in position. {Math.floor(time)}</Typography>
        }
        <Download file="poses.json" content={JSON.stringify([startPoses, endPoses])}>
            <Button variant='outlined'>Download Data</Button>
        </Download>
    </div>
}