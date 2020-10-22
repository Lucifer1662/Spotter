import React, { useRef, useEffect } from 'react';
import { Pose } from '@tensorflow-models/posenet';

interface Props {
    pose?: Pose,
    [propName: string]: any;
}


export function drawPoint(ctx:any, y:number, x:number, r:number, color:any) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

function drawKeypoints(keypoints:any, minConfidence:number = 0.01, ctx:any, scale = 1) {
    for (let i = 0; i < keypoints.length; i++) {
      const keypoint = keypoints[i];
  
      if (keypoint.score < minConfidence) {
        continue;
      }
  
      const {y, x} = keypoint.position;
      drawPoint(ctx, y * scale, x * scale, 3, 'blue');
    }
  }

export default function VideoWithArmature({ pose, ...props }: Props) {
    const canvasRef = useRef(null)

    const draw = (ctx: any, frameCount: number) => {


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
                draw(context, frameCount)
                animationFrameId = window.requestAnimationFrame(render)
            }
            render()

            return () => {
                window.cancelAnimationFrame(animationFrameId)
            }
        }
    }, [draw])

    return <canvas ref={canvasRef} {...props} />
}