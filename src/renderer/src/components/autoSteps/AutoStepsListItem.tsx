import {ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import AutoStepsListItemContainer from "./AutoStepsListItemContainer.tsx";
import useSelectedAutoStepID from "../../hooks/AutoSteps/selected/useSelectedAutoStepID.ts";
import GUID from "../../types/GUID.ts";
import useAutoStep from "../../hooks/AutoSteps/useAutoStep.ts";
import useAutoStepInfo from "../../hooks/AutoSteps/AutoStepInfo/useAutoStepInfo.ts";
import AutoStepType from "../../types/AutoSteps/AutoStepType.ts";

export interface AutoStepsListItemProps {
    autoStepID: GUID;
}

export default function AutoStepsListItem(props: AutoStepsListItemProps) {
    // Hooks
    const [selectedAutoStepID, setSelectedAutoStepID] = useSelectedAutoStepID();
    const [autoStep] = useAutoStep(props.autoStepID);
    const autoStepInfo = useAutoStepInfo(autoStep?.type);

    // Functions
    const selectThisStep = () => setSelectedAutoStepID(props.autoStepID);

    // State
    const isSelected = selectedAutoStepID === props.autoStepID;
    const isStart = autoStep?.type === AutoStepType.JUMPTO;
    const isStop = autoStep?.type === AutoStepType.STOP;
    const intent = isStart ? "success" : isStop ? "danger" : "primary";

    return (
        <AutoStepsListItemContainer
            disablePadding
            intent={intent}
        >
            <ListItemButton
                sx={{
                    borderRadius: 2
                }}
                dense
                selected={isSelected}
                onClick={selectThisStep}
            >
                <ListItemIcon>
                    {autoStepInfo?.icon}
                </ListItemIcon>
                <ListItemText
                    primary={autoStepInfo?.name}
                />
            </ListItemButton>
        </AutoStepsListItemContainer>
    )
}