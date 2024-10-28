import {saveHistoryAtom} from "../../Utils/useUndoHistory.ts";
import {atom, useSetAtom} from "jotai";
import {autoStepsAtom} from "../../AutoData/useAutoSteps.ts";
import {settingsAtom} from "../../Utils/useSettings.ts";
import {normalizeDegrees} from "../../../utils/toDegrees.ts";

// Atoms
export const rotateAutoStepsAtom = atom(null, (get, set, clockwise: boolean) => {
    
    // Get State
    const autoSteps = get(autoStepsAtom);
    const {normalizeRotation} = get(settingsAtom);

    // Rotate Auto Steps
    const newAutoSteps = autoSteps.map((autoStep) => {

        // Get Pose
        const pose = autoStep.pose ?? {x: 0, y: 0, r: 0};

        // Rotate Pose
        const newAutoStep = {
            ...autoStep,
            pose: {
                x: clockwise ? -pose.y : pose.y,
                y: clockwise ? pose.x : -pose.x,
                r: clockwise ? pose.r + 90 : pose.r - 90
            }
        };

        // Normalize Rotation
        if (normalizeRotation)
            newAutoStep.pose.r = normalizeDegrees(newAutoStep.pose.r);

        return newAutoStep;
    });

    // Save State
    set(autoStepsAtom, newAutoSteps);
    set(saveHistoryAtom);
});

// Hooks
export default function useRotateAutoSteps() {
    return useSetAtom(rotateAutoStepsAtom);
}