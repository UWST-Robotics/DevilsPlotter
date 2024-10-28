import useSelectedAutoStep from "../../hooks/AutoSteps/selected/useSelectedAutoStep.ts";
import PoseInput from "./PoseInput.tsx";
import AutoStepNumericInput from "./AutoStepNumericInput.tsx";

export default function AutoStepEditorPanel() {
    const [selectedAutoStep, setSelectedAutoStep] = useSelectedAutoStep();

    const hasPose = selectedAutoStep?.type === "START" || selectedAutoStep?.type === "GOTO";

    if (!selectedAutoStep)
        return null;
    return (
        <div>
            {hasPose && (
                <PoseInput
                    pose={selectedAutoStep.pose ?? {x: 0, y: 0, r: 0}}
                    onChange={(pose) => setSelectedAutoStep({...selectedAutoStep, pose})}
                />
            )}
            <AutoStepNumericInput prop={"distance"} label={"Distance"} isVisible={selectedAutoStep.type === "DRIVE"}/>
            <AutoStepNumericInput prop={"rotation"} label={"Rotation"} isVisible={selectedAutoStep.type === "ROTATE"}/>
        </div>
    )
}