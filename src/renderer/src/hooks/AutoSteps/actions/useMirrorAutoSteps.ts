import {saveHistoryAtom} from "../../Utils/useUndoHistory.ts";
import {atom, useSetAtom} from "jotai";
import {autoStepsAtom} from "../../AutoData/useAutoSteps.ts";
import {settingsAtom} from "../../Utils/useSettings.ts";
import {normalizeDegrees} from "../../../utils/toDegrees.ts";

// Atoms
export const mirrorAutoStepsAtom = atom(null, (get, set, vertical: boolean) => {

    // Get State
    const autoSteps = get(autoStepsAtom);
    const {normalizeRotation} = get(settingsAtom);

    // Mirror Auto Steps
    const newAutoSteps = autoSteps.map((autoStep) => {

        // Get Pose
        const pose = autoStep.pose ?? {x: 0, y: 0, r: 0};

        // Mirror Pose
        const newAutoStep = {
            ...autoStep,
            pose: {
                x: vertical ? pose.x : -pose.x,
                y: vertical ? -pose.y : pose.y,
                r: vertical ? -pose.r : 180 - pose.r
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
export default function useMirrorAutoSteps() {
    return useSetAtom(mirrorAutoStepsAtom);
}