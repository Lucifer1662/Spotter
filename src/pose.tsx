import { Pose } from "@tensorflow-models/posenet";


var pose : Pose = {score:0, keypoints: []};
export const setPose = (p:Pose)=>{
    pose.score = p.score;
    pose.keypoints = [...p.keypoints]
};

setPose({score:5, keypoints:[]})



export default pose;