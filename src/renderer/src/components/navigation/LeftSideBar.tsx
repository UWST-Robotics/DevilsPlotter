import AutoStepsList from "../autoSteps/AutoStepsList.tsx";

export default function LeftSideBar() {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                maxHeight: "100%",
                overflowY: "auto",
                width: 250,
                paddingTop: 10,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
        >
            <AutoStepsList/>
        </div>
    )

}