import useSelectedAutoStep from "../../hooks/AutoSteps/selected/useSelectedAutoStep.ts";
import PoseInput from "./PoseInput.tsx";
import AutoStepNumericInput from "./AutoStepNumericInput.tsx";
import {Box} from "@mui/material";

export default function AutoStepEditorPanel() {
    const [selectedAutoStep, setSelectedAutoStep] = useSelectedAutoStep();

    const hasPose = selectedAutoStep?.type === "JUMPTO" || selectedAutoStep?.type === "DRIVETO";

    if (!selectedAutoStep)
        return null;
    return (
        <Box sx={{padding: 1}}>
            {hasPose && (
                <PoseInput
                    pose={selectedAutoStep.pose ?? {x: 0, y: 0, r: 0}}
                    onChange={(pose) => setSelectedAutoStep({...selectedAutoStep, pose})}
                />
            )}
            <AutoStepNumericInput
                prop={"distance"}
                label={"Distance"}
                isVisible={selectedAutoStep.type === "DRIVE"}
                defaultValue={8}
            />
            <AutoStepNumericInput
                prop={"rotation"}
                label={"Rotation"}
                isVisible={selectedAutoStep.type === "ROTATE"}
                defaultValue={45}
            />
        </Box>
    )
}