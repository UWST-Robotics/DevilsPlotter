import { atomFamily } from "jotai/utils";
import { pathPlanAtom } from "./usePathPlan.ts";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import GUID from "../types/GUID.ts";
import PathPoint from "../types/PathPoint.ts";

export const pathPointAtomFamily = atomFamily((id: GUID) => {
    const pathPointAtom = atom(
        (get) => {
            const pathPlan = get(pathPlanAtom);
            return pathPlan.points.find((p) => p.id === id);
        },
        (get, set, point: PathPoint) => {
            const pathPlan = get(pathPlanAtom);
            const index = pathPlan.points.findIndex((p) => p.id === id);
            const newPoints = [...pathPlan.points];
            newPoints[index] = point;
            set(pathPlanAtom, {
                ...pathPlan,
                points: newPoints,
            });
        }
    );
    pathPointAtom.debugLabel = `pathPointAtomFamily(${id})`;
    return pathPointAtom;
});

export function usePathPoint(id: GUID) {
    return useAtom(pathPointAtomFamily(id));
}

export default function usePathPointValue(id: GUID) {
    return useAtomValue(pathPointAtomFamily(id));
}

export function useSetPathPoint(id: GUID) {
    return useSetAtom(pathPointAtomFamily(id));
}