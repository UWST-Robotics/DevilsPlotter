import AutoData from "../../types/AutoData.ts";
import {atom, useAtom, useAtomValue} from "jotai";
import generateGUID from "../../utils/generateGUID.ts";
import AutoStepType from "../../types/AutoSteps/AutoStepType.ts";

export const DEFAULT_DATA: AutoData = {
    steps: [
        {
            id: generateGUID(),
            type: AutoStepType.JUMPTO,
            pose: {x: 0, y: 0, r: 0}
        }
    ],
    occupancyGrid: [],
}

export const autoDataAtom = atom(DEFAULT_DATA);

export function useAutoData() {
    return useAtom(autoDataAtom);
}

export default function useRawAutoDataValue() {
    return useAtomValue(autoDataAtom);
}