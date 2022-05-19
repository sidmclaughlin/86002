import isHexColor from 'hex-color-regex';

// Source: https://24ways.org/2010/calculating-color-contrast
export const getContrastYIQ = (hex: string): string | undefined => {
  if (!isHexColor({ strict: true }).test(hex)) return undefined;

  const cleanHex = hex.replace('#', '');

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? 'black' : 'white';
};
