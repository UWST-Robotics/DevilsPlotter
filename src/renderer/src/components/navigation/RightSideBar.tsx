import TransparentCard from "../common/TransparentCard.tsx";
import AutoStepEditorPanel from "../autoStepEditor/AutoStepEditorPanel.tsx";

export default function RightSideBar() {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none",
                width: 300
            }}
        >
            <TransparentCard>
                <AutoStepEditorPanel/>
            </TransparentCard>
        </div>
    )

}