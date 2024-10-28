import AutoStep from "../../types/AutoSteps/AutoStep.ts";
import FlexNumericInput from "../common/input/FlexNumericInput.tsx";
import useSelectedAutoStepProp from "../../hooks/AutoSteps/selected/useSelectedAutoStepProp.tsx";

export interface AutoStepNumericInputProps {
    prop: keyof AutoStep;
    defaultValue?: number;
    label: string;
    isVisible: boolean;
}

export default function AutoStepNumericInput(props: AutoStepNumericInputProps) {
    const [value, setValue] = useSelectedAutoStepProp(props.prop);
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