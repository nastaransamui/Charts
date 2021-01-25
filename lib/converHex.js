
export const convertHex = (hexCode, opacity) => {
    let hex = hexCode.replace('#', '');
    let r, g, b
    if (hex.length === 3) {
        r = parseInt(hex.substring(0, 1), 16)
        g = parseInt(hex.substring(1, 2), 16)
        b = parseInt(hex.substring(2, 3), 16)
      }
      else {
        r = parseInt(hex.substring(0, 2), 16)
        g = parseInt(hex.substring(2, 4), 16)
        b = parseInt(hex.substring(4, 6), 16)
      }

    return `rgba(${r},${g},${b},${opacity / 100})`;
};