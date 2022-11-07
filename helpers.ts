export const percentToHex = (p: number) => {
    const intValue = Math.round(p / 100 * 255); // map percent to nearest integer (0 - 255)
    const hexValue = intValue.toString(16); // get hexadecimal representation
    return hexValue.padStart(2, '0').toUpperCase(); // format with leading 0 and upper case characters
}

const normalize = (val: any, max: any, min: any) => { return (val - min) / (max - min); };
export const hexToPercent = (alpha: string) => {
    return Math.round(normalize(parseInt(alpha, 16), 255, 0) * 100);
}

export function hexToRGBA(hex: string) {
    if (hex.length !== 9 || hex[0] !== "#") return hex
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16),
        a = hexToPercent(hex.slice(7, 9)) * 0.01;

    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}