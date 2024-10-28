import AutoStepType from "../types/AutoSteps/AutoStepType.ts";
import {ArrowForward, PinDrop, RotateRight, Route, Stop} from "@mui/icons-material";
import AutoStepInfo from "../types/AutoSteps/AutoStepInfo.ts";
import generateGUID from "../utils/generateGUID.ts";
import AutoStep from "../types/AutoSteps/AutoStep.ts";
import Pose from "../types/Pose.ts";

const DEG_TO_RAD = Math.PI / 180;

const AutoStepTypes: AutoStepInfo[] = [
    {
        icon: <PinDrop/>,
        name: "Jump to Pose",
        type: AutoStepType.JUMPTO,
        deserialize: (params: number[]) => {
            if (params.length < 3)
                throw new Error("Invalid number of parameters");
            return {
                id: generateGUID(),
                type: AutoStepType.JUMPTO,
                pose: {x: params[0], y: params[1], r: params[2]}
            };
        },
        serialize: (step: AutoStep) => {
            if (step.type !== AutoStepType.JUMPTO)
                throw new Error("Invalid step type");
            const {pose} = step;
            return [
                pose?.x ?? 0,
                pose?.y ?? 0,
                pose?.r ?? 0
            ];
        },
        getPose: (step: AutoStep) => {
            return step.pose ?? {x: 0, y: 0, r: 0};
        }
    },
    {
        icon: <ArrowForward/>,
        name: "Drive",
        type: AutoStepType.DRIVE,
        deserialize: (params: number[]) => {
            if (params.length < 1)
                throw new Error("Invalid number of parameters");
            return {
                id: generateGUID(),
                type: AutoStepType.DRIVE,
                distance: params[0]
            };
        },
        serialize: (step: AutoStep) => {
            if (step.type !== AutoStepType.DRIVE)
                throw new Error("Invalid step type");
            const {distance} = step;
            return [distance ?? 12];
        },
        getPose: (step: AutoStep, prevPose: Pose) => {
            const distance = step.distance ?? 12;
            const x = prevPose.x + distance * Math.cos(prevPose.r * DEG_TO_RAD);
            const y = prevPose.y + distance * Math.sin(prevPose.r * DEG_TO_RAD);
            return {x, y, r: prevPose.r};
        }
    },
    {
        icon: <RotateRight/>,
        name: "Rotate",
        type: AutoStepType.ROTATE,
        deserialize: (params: number[]) => {
            if (params.length < 1)
                throw new Error("Invalid number of parameters");
            return {
                id: generateGUID(),
                type: AutoStepType.ROTATE,
                rotation: params[0]
            };
        },
        serialize: (step: AutoStep) => {
            const {rotation} = step;
            return [rotation ?? 45];
        },
        getPose: (step: AutoStep, prevPose: Pose) => {
            const rotation = step.rotation ?? 45;
            return {x: prevPose.x, y: prevPose.y, r: prevPose.r + rotation};
        }
    },
    {
        icon: <Route/>,
        name: "Drive to Pose",
        type: AutoStepType.DRIVETO,
        deserialize: (params: number[]) => {
            if (params.length < 5)
                throw new Error("Invalid number of parameters");
            return {
                id: generateGUID(),
                type: AutoStepType.DRIVETO,
                pose: {x: params[0], y: params[1], r: params[2]},
                initialOffset: params[3],
                exitOffset: params[4]
            };
        },
        serialize: (step: AutoStep) => {
            const {pose, enterOffset, exitOffset} = step;
            return [
                pose?.x ?? 0,
                pose?.y ?? 0,
                pose?.r ?? 0,
                enterOffset ?? 12,
                exitOffset ?? 12
            ];
        },
        getPose: (step: AutoStep) => {
            return step.pose ?? {x: 0, y: 0, r: 0};
        }
    },
    {
        icon: <Stop/>,
        name: "Stop",
        type: AutoStepType.STOP,
        deserialize: () => {
            return {
                id: generateGUID(),
                type: AutoStepType.STOP
            };
        },
        serialize: (step: AutoStep) => {
            if (step.type !== AutoStepType.STOP)
                throw new Error("Invalid step type");
            return [];
        },
        getPose: (_: AutoStep, prevPose: Pose) => {
            return prevPose;
        }
    }
];

export default AutoStepTypes;