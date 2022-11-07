export const percentToHex = (p: number) => {
    const intValue = Math.round(p / 100 * 255); // map percent to nearest integer (0 - 255)
    const hexValue = intValue.toString(16); // get hexadecimal representation
    return hexValue.padStart(2, '0').toUpperCase(); // format with leading 0 and upper case characters
}

const normalize = (val: any, max: any, min: any) => { return (val - min) / (max - min); };
export const hexToPercent = (alpha: string) => {
    return Math.round(normalize(parseInt(alpha, 16), 255, 0) * 100);
}