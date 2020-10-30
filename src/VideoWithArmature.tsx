import React, { useRef, useEffect } from 'react';
import { Pose } from '@tensorflow-models/posenet';

interface Props {
    pose?: Pose,
    [propName: string]: any;
}

function draw(ctx: any, frameCount: number, pose?: Pose){


    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = '#000000'
    if (pose && pose.keypoints) {
        pose.keypoints.forEach(keypoint => {
                ctx.beginPath()
                ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI)
                ctx.fill()
        })

    }        
}

export default function VideoWithArmature({ pose, ...props }: Props) {
    const canvasRef = useRef(null)

   

    useEffect(() => {

       

        const canvas = canvasRef.current;
        if (canvas) {
            //@ts-ignore
            const context = canvas.getContext('2d')
            let frameCount = 0
            let animationFrameId: any = undefined;

            //Our draw came here
            const render = () => {
                frameCount++
                draw(context, frameCount, pose)
                animationFrameId = window.requestAnimationFrame(render)
            }
            render()

            return () => {
                window.cancelAnimationFrame(animationFrameId)
            }
        }
    }, [pose])

    return <canvas ref={canvasRef} {...props} />
}