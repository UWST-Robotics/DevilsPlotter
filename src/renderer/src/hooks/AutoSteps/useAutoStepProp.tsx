import {atomFamily} from "jotai/utils";
import AutoStep from "../../types/AutoSteps/AutoStep.ts";
import {atom, useAtom} from "jotai";
import GUID from "../../types/GUID.ts";
import {autoStepAtomFamily} from "./useAutoStep.ts";

type AutoStepProp = keyof AutoStep;

interface AutoStepPropOptions {
    propName: AutoStepProp;
    id: GUID;
}

// Atoms
export const autoStepPropAtom = atomFamily((options: AutoStepPropOptions) => {
    return atom((get) => {
        const autoStep = get(autoStepAtomFamily(options.id));
        return autoStep?.[options.propName];
    }, (get, set, newValue: any) => {
        const autoStep = get(autoStepAtomFamily(options.id));
        if (autoStep !== undefined)
            set(autoStepAtomFamily(options.id), {...autoStep, [options.propName]: newValue});
    });
}, (a, b) => a.propName === b.propName && a.id === b.id);

// Hooks
export default function useAutoStepProp<T extends AutoStepProp>(propName: T, id: GUID) {
    return useAtom(autoStepPropAtom({propName, id})) as [AutoStep[T] | undefined, (newValue: AutoStep[T]) => void];
}