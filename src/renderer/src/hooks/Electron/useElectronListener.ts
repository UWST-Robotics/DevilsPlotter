import useFileDownload from "../FileIO/useFileDownload.ts";
import useFileUpload from "../FileIO/useFileUpload.ts";
import React from "react";
import {useRedoChanges, useUndoChanges} from "../Utils/useUndoHistory.ts";
import useMirrorAutoSteps from "../AutoSteps/actions/useMirrorAutoSteps.ts";
import useRotateAutoSteps from "../AutoSteps/actions/useRotateAutoSteps.ts";
import {useSetShowAbout} from "../Utils/useAboutModal.ts";
import {useSettings} from "../Utils/useSettings.ts";
import useDeleteSelectedAutoStep from "../AutoSteps/actions/useDeleteSelectedAutoStep.ts";

/**
 * This hook listens for events from the main process and triggers the appropriate file upload/download functions.
 * Should be called once in the application lifecycle (singleton).
 */
export default function useElectronListener() {
    const downloadFile = useFileDownload();
    const uploadFile = useFileUpload();
    const [, undo] = useUndoChanges();
    const [, redo] = useRedoChanges();
    const mirrorPath = useMirrorAutoSteps();
    const rotatePath = useRotateAutoSteps();
    const setAboutVisible = useSetShowAbout();
    const [settings, setSettings] = useSettings();
    const deleteSelectedAutoStep = useDeleteSelectedAutoStep();

    React.useEffect(() => {
        electronAPI?.onOpen(uploadFile);
        electronAPI?.onSave(() => downloadFile({saveAs: false}));
        electronAPI?.onSaveAs(() => downloadFile({saveAs: true}));
        electronAPI?.onUndo(undo);
        electronAPI?.onRedo(redo);
        electronAPI?.onMirrorHorizontal(() => mirrorPath(false));
        electronAPI?.onMirrorVertical(() => mirrorPath(true));
        electronAPI?.onRotateCW(() => rotatePath(true));
        electronAPI?.onRotateCCW(() => rotatePath(false));
        electronAPI?.onAbout(() => setAboutVisible(true));
        electronAPI?.onToggleGrid(() => setSettings({...settings, showGrid: !settings.showGrid}));
        electronAPI?.onToggleSnap(() => setSettings({...settings, snapPosition: !settings.snapPosition}));
        electronAPI?.onToggleSnapRotation(() => setSettings({...settings, snapRotation: !settings.snapRotation}));
        electronAPI?.onDelete(() => deleteSelectedAutoStep());

        return electronAPI?.removeAllListeners;
    }, [downloadFile, uploadFile, undo, redo, mirrorPath, rotatePath, setAboutVisible, settings, setSettings]);
}