import {atom, useAtom} from "jotai";
import {selectedAutoStepIDAtom} from "./useSelectedAutoStepID.ts";
import {autoStepAtomFamily} from "../useAutoStep.ts";
import AutoStep from "../../../types/AutoSteps/AutoStep.ts";

// Atoms
export const selectedAutoStepAtom = atom((get) => {
    const selectedAutoStepID = get(selectedAutoStepIDAtom);
    if (!selectedAutoStepID)
        return undefined;

    return get(autoStepAtomFamily(selectedAutoStepID));
}, (_get, set, update: AutoStep) => {
    set(autoStepAtomFamily(update.id), update);
});

// Hooks
export default function useSelectedAutoStep() {
    return useAtom(selectedAutoStepAtom);
}