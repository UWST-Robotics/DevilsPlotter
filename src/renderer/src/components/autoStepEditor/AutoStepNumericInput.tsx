import AutoStep from "../../types/AutoSteps/AutoStep.ts";
import FlexNumericInput from "../common/input/FlexNumericInput.tsx";
import useSelectedAutoStepProp from "../../hooks/AutoSteps/selected/useSelectedAutoStepProp.tsx";

export interface AutoStepNumericInputProps {
    prop: keyof AutoStep;
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
            value={value ? Number(value) : 0}
            onChange={(value) => setValue(value)}
            inputProps={{label}}
        />
    )
}