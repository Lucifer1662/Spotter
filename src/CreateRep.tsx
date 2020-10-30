import React, { useEffect } from 'react';
import WebCamPose from './WebCamPose';
import { Button, Typography, TextField } from '@material-ui/core';
import useUniversalState from './reducers/useUniversalState';
import pose from './pose';
//@ts-ignore
import Download from '@axetroy/react-download';


enum StatesEnum {
    NotStarted = "Not Started",
    Init1Pose = "Init 1st Pose",
    Creating1Pose = "Create 1st Pose",
    Init2Pose = "Init 2nd Pose",
    Creating2Pose = "Create 2nd Pose",
    Finished = "Finished"
}

export default function CreateRep() {

    let myName = "CreateRep";
    let parents = [myName];

    let startTime = 5;
    let [state, setState] = useUniversalState<any>(myName, [], {
        startPoses: [],
        endPoses: [],
        stage: StatesEnum.NotStarted,
        time: 0,
        frequency: 1,
        name: '',
    });

    const trainingExamples = 100;

    var { startPoses, endPoses, stage, time, frequency, name } = state;
    const sampleFrequency = 20;

    useEffect(() => {
        if (time > 0) {


            var timer = setTimeout(() => {
                setState({ time: time - (1 / frequency) })
            }, 1000 / frequency)


            return () => clearTimeout(timer);
        }



    }, [time, frequency, setState]);


    useEffect(() => {
        if (stage === StatesEnum.Init1Pose && time <= 0) {
            setState({ stage: StatesEnum.Creating1Pose })
        }

        if (stage === StatesEnum.Creating1Pose && time <= 0) {

            if (startPoses.length >= trainingExamples) {
                setState({ stage: StatesEnum.Init2Pose, time: startTime, frequency: 1 })
            }
            else {
                if (pose && pose.keypoints) {

                    setState({ time: 2 / sampleFrequency, frequency: sampleFrequency, startPoses: [...startPoses, pose] });
                } else {
                    setState({ time: 2 / sampleFrequency, frequency: sampleFrequency });
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
                    setState({ time: 2 / sampleFrequency, frequency: sampleFrequency, endPoses: [...endPoses, pose] });
                } else {
                    setState({ time: 2 / sampleFrequency, frequency: sampleFrequency });
                }
            }
        }

    }, [time, stage, endPoses, setState, startPoses, startTime])





    return <div style={{ margin: '10px' }}>
        <TextField label="Name" variant="filled" onChange={(e) => setState({ name: e.target.value })} />
        <WebCamPose parents={parents} />
        {stage === StatesEnum.NotStarted && <Button
            onClick={() => {
                if (name !== '')
                    setState({ stage: StatesEnum.Init1Pose, time: startTime })
                else
                    alert("Please type for this repition")

            }
            } variant="outlined">Create new Rep</Button>}
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