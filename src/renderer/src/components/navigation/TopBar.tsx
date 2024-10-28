import SettingsButton from "../settings/SettingsButton.tsx";
import DownloadButton from "../buttons/DownloadButton.tsx";
import UploadButton from "../buttons/UploadButton.tsx";
import {Divider} from "@mui/material";
import MirrorAutoStepsButton from "../buttons/MirrorAutoStepsButton.tsx";
import UndoRedoButton from "../buttons/UndoRedoButton.tsx";
import RotateAutoStepsButton from "../buttons/RotateAutoStepsButton.tsx";

export default function TopBar() {

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none"
            }}
        >
            <div
                style={{
                    display: "flex",
                    pointerEvents: "auto",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    maxWidth: "100vw",
                    flexWrap: "wrap",
                    backgroundColor: "#00000077",
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                }}
            >
                <DownloadButton/>
                <UploadButton/>
                <Divider orientation="vertical" variant="middle" flexItem/>
                <MirrorAutoStepsButton/>
                <MirrorAutoStepsButton vertical/>
                <Divider orientation="vertical" variant="middle" flexItem/>
                <RotateAutoStepsButton/>
                <RotateAutoStepsButton clockwise/>
                <Divider orientation="vertical" variant="middle" flexItem/>
                <UndoRedoButton/>
                <UndoRedoButton redo/>
                <Divider orientation="vertical" variant="middle" flexItem/>
                <SettingsButton/>
            </div>
        </div>
    )
}