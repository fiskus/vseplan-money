import { generateMedia } from 'styled-media-query';

export const MOBILE = 415;

export const WIDE = 801;

export const media = generateMedia({
  mobile: `${MOBILE}px`,
  wide: `${WIDE}px`,
});
