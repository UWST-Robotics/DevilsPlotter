import usePrevAutoStep from "../../../hooks/AutoSteps/usePrevAutoStep.ts";
import useAutoStep from "../../../hooks/AutoSteps/useAutoStep.ts";
import GUID, {EMPTY_GUID} from "../../../types/GUID.ts";
import useAutoStepPose from "../../../hooks/Pose/useAutoStepPose.ts";
import {Line} from "react-konva";
import useSettingsValue from "../../../hooks/Utils/useSettings.ts";

export interface PathSegmentRendererProps {
    autoStepID: GUID;
}

export default function PathSegmentRenderer(props: PathSegmentRendererProps) {
    const [prevAutoStep] = usePrevAutoStep(props.autoStepID);
    const [autoStep] = useAutoStep(props.autoStepID);
    const pose = useAutoStepPose(autoStep?.id ?? EMPTY_GUID);
    const prevPose = useAutoStepPose(prevAutoStep?.id ?? EMPTY_GUID);
    const {pixelsPerInch} = useSettingsValue();

    if (!autoStep || !prevAutoStep || !pose || !prevPose)
        return null;

    return (
        <Line
            points={[
                prevPose.x * pixelsPerInch,
                prevPose.y * pixelsPerInch,
                pose.x * pixelsPerInch,
                pose.y * pixelsPerInch
            ]}
            stroke={"#ddd"}
            strokeWidth={0.4 * pixelsPerInch}
            perfectDrawEnabled={false}

            dashEnabled={autoStep.type === "JUMPTO"}
            dash={[5, 5]}
        />
    )
}