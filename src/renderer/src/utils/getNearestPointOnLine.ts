/**
 * Gets the nearest point on a line to a given point.
 * https://stackoverflow.com/questions/32281168/find-a-point-on-a-line-closest-to-a-third-point-javascript
 * @param px - The x coordinate of the point
 * @param py - The y coordinate of the point
 * @param ax - The x coordinate of the first point of the line
 * @param ay - The y coordinate of the first point of the line
 * @param bx - The x coordinate of the second point of the line
 * @param by - The y coordinate of the second point of the line
 * @param shouldClamp - Whether to clamp the point to the line segment
 * @returns The nearest point on the line
 */
export function getNearestPointOnLine(px: number, py: number, ax: number, ay: number, bx: number, by: number, shouldClamp: boolean = true) {
    const atob = {x: bx - ax, y: by - ay};
    const atop = {x: px - ax, y: py - ay};
    const len = (atob.x * atob.x) + (atob.y * atob.y);
    const dot = (atop.x * atob.x) + (atop.y * atob.y);
    let t = dot / len;

    if (shouldClamp)
        t = Math.max(0, Math.min(1, t));

    return {x: ax + (atob.x * t), y: ay + (atob.y * t), t};
}
