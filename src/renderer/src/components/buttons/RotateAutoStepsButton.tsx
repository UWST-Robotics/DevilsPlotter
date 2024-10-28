import {IconButton} from "@mui/material";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import useRotateAutoSteps from "../../hooks/AutoSteps/actions/useRotateAutoSteps.ts";

export interface RotatePathButtonProps {
    clockwise?: boolean;
}

export default function RotateAutoStepsButton(props: RotatePathButtonProps) {
    const {showOccupancyGrid} = useSettingsValue();
    const rotatePath = useRotateAutoSteps();

    if (showOccupancyGrid)
        return null;
    return (
        <IconButton
            aria-label={`Rotate Path ${props.clockwise ? "Clockwise" : "Counter-Clockwise"}`}
            onClick={() => rotatePath(props.clockwise ?? false)}
        >
            {props.clockwise ? <RotateRightIcon/> : <RotateLeftIcon/>}
        </IconButton>
    )
}