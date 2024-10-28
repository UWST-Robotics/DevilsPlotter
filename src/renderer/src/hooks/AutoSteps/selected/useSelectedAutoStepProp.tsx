// Atoms
import {atomFamily} from "jotai/utils";
import AutoStep from "../../../types/AutoSteps/AutoStep.ts";
import {atom, useAtom} from "jotai";
import {selectedAutoStepAtom} from "./useSelectedAutoStep.ts";

type AutoStepProp = keyof AutoStep;

export const selectedAutoStepPropAtom = atomFamily((propName: AutoStepProp) => {
    return atom((get) => {
        const selectedAutoStep = get(selectedAutoStepAtom);
        return selectedAutoStep?.[propName];
    }, (get, set, newValue: any) => {
        const selectedAutoStep = get(selectedAutoStepAtom);
        if (selectedAutoStep)
            set(selectedAutoStepAtom, {...selectedAutoStep, [propName]: newValue});
    });
});

// Hooks
export default function useSelectedAutoStepProp<T extends AutoStepProp>(propName: T) {
    return useAtom(selectedAutoStepPropAtom(propName)) as [AutoStep[T] | undefined, (newValue: AutoStep[T]) => void];
}