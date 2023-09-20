import useSettingsValue from "../../hooks/useSettings.ts";
import React from "react";
import { Image } from "react-konva";
import { useSetWindowScale } from "../../hooks/useWindowScale.ts";
import useWindowSize from "../../hooks/useWindowSize.ts";

// Minimum padding around image
const IMAGE_PADDING = 110;

export default function FieldImageRenderer() {
    const settings = useSettingsValue();
    const [windowWidth, windowHeight] = useWindowSize();
    const setWindowScale = useSetWindowScale();
    const [image, setImage] = React.useState<HTMLImageElement | undefined>(undefined);

    // Load Image
    React.useEffect(() => {
        const { imageData } = settings;
        const img = new window.Image();
        img.src = imageData;
        img.onload = () => {
            setImage(img);
        };
    }, [settings]);

    // Set window scale
    React.useEffect(() => {
        if (image) {
            const scale = Math.min(
                (windowWidth - IMAGE_PADDING) / image.width,
                (windowHeight - IMAGE_PADDING) / image.height
            );
            setWindowScale(scale);
        }
    }, [image, windowWidth, windowHeight, setWindowScale]);

    return (
        <>
            {image && (
                <Image
                    image={image}
                    x={-image.width / 2}
                    y={-image.height / 2}
                    width={image.width}
                    height={image.height}
                    isListening={false}
                />
            )}
        </>
    )
}