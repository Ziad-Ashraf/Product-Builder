/**
 * 
 * @param {string} txt 
 * @param {number} [maxLength = 50]
 * @returns 
 */
export function txtSlicer(txt: string, maxLength: number = 70) {
    if (txt.length >= maxLength) {
        return `${txt.slice(0, maxLength)}...`;
    } else {
        return txt;
    }
}