import {IconButton} from "@mui/material";
import FlipIcon from '@mui/icons-material/Flip';
import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import useMirrorAutoSteps from "../../hooks/AutoSteps/actions/useMirrorAutoSteps.ts";

export interface MirrorPathButtonProps {
    vertical?: boolean;
}

export default function MirrorAutoStepsButton(props: MirrorPathButtonProps) {
    const {showOccupancyGrid} = useSettingsValue();
    const mirrorPath = useMirrorAutoSteps();

    if (showOccupancyGrid)
        return null;
    return (
        <IconButton
            aria-label={`Mirror Path ${props.vertical ? "Vertically" : "Horizontally"}`}
            onClick={() => mirrorPath(props.vertical ?? false)}
        >
            <FlipIcon
                sx={{
                    transform: props.vertical ? "rotate(90deg)" : "rotate(0deg)"
                }}
            />
        </IconButton>
    )
}