import useAutoStepIDs from "../../../hooks/AutoSteps/useAutoStepIDs.ts";
import {Group} from "react-konva";
import PathSegmentRenderer from "./PathSegmentRenderer.tsx";

export default function PathRenderer() {
    const autoStepIDs = useAutoStepIDs();

    return (
        <Group listening={false}>
            {autoStepIDs.map((autoStepID) => (
                <PathSegmentRenderer
                    key={autoStepID}
                    autoStepID={autoStepID}
                />
            ))}
        </Group>
    )
}