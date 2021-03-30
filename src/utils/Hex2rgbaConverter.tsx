// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const rgba2HexConverter = (orig: any): string => {
    let a,
        // eslint-disable-next-line prefer-const
        rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
        alpha = ((rgb && rgb[4]) || '').trim(),
        // eslint-disable-next-line prefer-const
        hex = rgb
            ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
              (rgb[2] | (1 << 8)).toString(16).slice(1) +
              (rgb[3] | (1 << 8)).toString(16).slice(1)
            : orig;
    if (alpha !== '') {
        a = alpha;
    } else {
        a = '0o1';
    }

    a = Math.round(a * 100) / 100;
    alpha = Math.round(a * 255);

    return hex;
};

const Hex2rgbaConverter = (hexCode: string, opacity: number): string => {
    let hex = hexCode.replace('#', '');

    if (hex.length === 3) {
        hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r},${g},${b},${opacity / 100})`;
};

export default Hex2rgbaConverter;
