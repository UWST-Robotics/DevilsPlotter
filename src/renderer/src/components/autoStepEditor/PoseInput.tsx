import Pose from "../../types/Pose.ts";
import InputGroup from "../common/input/InputGroup.tsx";
import FlexNumericInput from "../common/input/FlexNumericInput.tsx";

export interface PoseInputProps {
    pose: Pose;
    onChange: (pose: Pose) => void;
}

export default function PoseInput(props: PoseInputProps) {
    const {pose, onChange} = props;

    return (
        <>
            <InputGroup>
                <FlexNumericInput
                    inputProps={{label: "X", variant: "outlined"}}
                    value={pose.x}
                    onChange={(x) => onChange({...pose, x})}
                />
                <FlexNumericInput
                    inputProps={{label: "Y"}}
                    value={pose.y}
                    onChange={(y) => onChange({...pose, y})}
                />
            </InputGroup>
            <InputGroup>
                <FlexNumericInput
                    inputProps={{label: "Rotation", sx: {marginTop: 1}, fullWidth: true}}
                    value={pose.r}
                    onChange={(r) => onChange({...pose, r})}
                />
            </InputGroup>
        </>
    )
}