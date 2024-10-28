import {atom, useSetAtom} from "jotai";
import AutoStep from "../../../types/AutoSteps/AutoStep.ts";
import {autoStepsAtom} from "../../AutoData/useAutoSteps.ts";
import {selectedAutoStepIDAtom} from "../selected/useSelectedAutoStepID.ts";

// Atoms
export const addAutoStepAtom = atom(null, (get, set, autoStep: AutoStep) => {

    // Get AutoSteps
    const autoSteps = get(autoStepsAtom);

    // Get Selected Index
    const selectedAutoStepID = get(selectedAutoStepIDAtom);
    let selectedIndex = autoSteps.findIndex((s) => s.id === selectedAutoStepID);
    if (selectedIndex === -1)
        selectedIndex = autoSteps.length - 1;

    // Insert AutoStep
    const autoStepsCopy = [...autoSteps];
    autoStepsCopy.splice(selectedIndex + 1, 0, autoStep);

    // Update Atom
    set(autoStepsAtom, autoStepsCopy);
});

// Hooks
export default function useAddAutoStep() {
    return useSetAtom(addAutoStepAtom);
}