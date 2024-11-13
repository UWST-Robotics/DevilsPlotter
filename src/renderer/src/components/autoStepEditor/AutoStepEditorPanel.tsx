import PoseInput from "./PoseInput.tsx";
import AutoStepNumericInput from "./AutoStepNumericInput.tsx";
import {Box} from "@mui/material";
import GUID from "../../types/GUID.ts";
import useAutoStep from "../../hooks/AutoSteps/useAutoStep.ts";

export interface AutoStepEditorPanelProps {
    id: GUID;
}

export default function AutoStepEditorPanel(props: AutoStepEditorPanelProps) {
    const [autoStep, setAutoStep] = useAutoStep(props.id);

    const hasPose = autoStep?.type === "JUMPTO" || autoStep?.type === "DRIVETO";

    if (!autoStep)
        return null;
    return (
        <Box sx={{padding: 1}}>
            {hasPose && (
                <PoseInput
                    pose={autoStep.pose ?? {x: 0, y: 0, r: 0}}
                    onChange={(pose) => setAutoStep({...autoStep, pose})}
                />
            )}
            <AutoStepNumericInput
                id={props.id}
                prop={"distance"}
                label={"Distance"}
                isVisible={autoStep.type === "DRIVE"}
                defaultValue={8}
            />
            <AutoStepNumericInput
                id={props.id}
                prop={"rotation"}
                label={"Rotation"}
                isVisible={autoStep.type === "ROTATE"}
                defaultValue={45}
            />
        </Box>
    )
}