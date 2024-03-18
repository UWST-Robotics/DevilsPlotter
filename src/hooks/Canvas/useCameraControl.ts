import React from "react";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import Camera from "../../types/Camera.ts";
import useWindowScaleValue from "./useWindowScale.ts";
import useWindowSize from "./useWindowSize.ts";

const ZOOM_SPEED = 1.002;
const DEFAULT_CAMERA: Camera = { x: 0, y: 0, scale: 1 };

export default function useCameraControl() {
    const windowScale = useWindowScaleValue();
    const [windowWidth, windowHeight] = useWindowSize();
    const stageRef = React.useRef<Konva.Stage>(null);
    const layerRef = React.useRef<Konva.Layer>(null);

    const getCamera = React.useCallback(() => {
        const stage = stageRef.current;
        const layer = layerRef.current;
        if (!stage || !layer)
            return DEFAULT_CAMERA;

        return {
            x: stage.x(),
            y: stage.y(),
            scale: layer.scaleX() / windowScale,
        };
    }, [windowScale]);

    const setCamera = React.useCallback((camera: { x: number, y: number, scale: number }) => {
        const stage = stageRef.current;
        const layer = layerRef.current;
        if (!stage || !layer)
            return;

        stage.x(camera.x);
        stage.y(camera.y);
        layer.scaleX(camera.scale * windowScale);
        layer.scaleY(camera.scale * windowScale);
    }, [windowScale]);

    const onScroll = React.useCallback((e: KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();

        // Get current camera
        const camera = getCamera();

        // Calculate new scale
        const newScale = camera.scale * Math.pow(ZOOM_SPEED, -e.evt.deltaY);
        const zoomDelta = newScale / camera.scale;

        // Calculate Mouse Offset
        const mouseOffsetX = e.evt.offsetX - windowWidth / 2;
        const mouseOffsetY = e.evt.offsetY - windowHeight / 2;

        // Calculate new position
        const newX = camera.x - (mouseOffsetX - camera.x) * (zoomDelta - 1);
        const newY = camera.y - (mouseOffsetY - camera.y) * (zoomDelta - 1);

        // Set new camera
        setCamera({ x: newX, y: newY, scale: newScale });
    }, [getCamera, setCamera, windowWidth, windowHeight]);

    const onMouseDown = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (e.evt.button === 2) {
            e.target.stopDrag();
            e.target.getStage()?.startDrag();
            e.evt.preventDefault();
        }
    }, []);

    const onMouseUp = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (e.evt.button === 2) {
            e.target.getStage()?.stopDrag();
            e.evt.preventDefault();
        }
    }, []);

    const onContextMenu = React.useCallback((e: KonvaEventObject<MouseEvent>) => {
        e.evt.preventDefault();
    }, []);

    React.useEffect(() => {
        Konva.dragButtons = [0, 1, 2];
        Konva.hitOnDragEnabled = true;

        // Assign Events
        const stage = stageRef.current;
        if (!stage)
            return () => {
            };

        stage.on("wheel", onScroll);
        stage.on("mousedown", onMouseDown);
        stage.on("mouseup", onMouseUp);
        stage.on("contextmenu", onContextMenu);

        return () => {
            stage.off("wheel", onScroll);
            stage.off("mousedown", onMouseDown);
            stage.off("mouseup", onMouseUp);
            stage.off("contextmenu", onContextMenu);
        };
    }, [onScroll, onMouseDown, onMouseUp, onContextMenu]);

    return {
        stageRef,
        layerRef
    };
}