import AutoStep from "../../types/AutoSteps/AutoStep.ts";
import FlexNumericInput from "../common/input/FlexNumericInput.tsx";
import useAutoStepProp from "../../hooks/AutoSteps/useAutoStepProp.tsx";
import GUID from "../../types/GUID.ts";

export interface AutoStepNumericInputProps {
    id: GUID;
    prop: keyof AutoStep;
    defaultValue?: number;
    label: string;
    isVisible: boolean;
}

export default function AutoStepNumericInput(props: AutoStepNumericInputProps) {
    const [value, setValue] = useAutoStepProp(props.prop, props.id);
    const {label, isVisible} = props;

    if (!isVisible)
        return null;
    return (
        <FlexNumericInput
            value={value ? Number(value) : props.defaultValue ?? 0}
            onChange={(value) => setValue(value)}
            inputProps={{label, sx: {marginTop: 1}, fullWidth: true}}
        />
    )
}