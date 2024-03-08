import { useRawPath } from "../../hooks/Path/useRawPath.ts";
import { Button } from "@blueprintjs/core";
import React from "react";
import { normalizeRadians } from "../../utils/toDegrees.ts";

export interface MirrorPathButtonProps {
    vertical?: boolean;
}

export default function MirrorPathButton(props: MirrorPathButtonProps) {
    const [path, setPath] = useRawPath();

    const { vertical } = props;

    const onClick = React.useCallback(() => {
        const newPoints = path.points.map((p) => ({
            ...p,
            x: vertical ? p.x : -p.x,
            y: vertical ? -p.y : p.y,
            r: normalizeRadians(vertical ? -p.r : Math.PI - p.r)
        }));
        setPath({
            ...path,
            points: newPoints,
        });
    }, [path, setPath, vertical]);

    return (
        <Button
            icon={vertical ? "arrows-vertical" : "arrows-horizontal"}
            onClick={onClick}
        />
    )
}