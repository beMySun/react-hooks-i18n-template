import NP from 'number-precision';

if (process.env.env) {
  NP.enableBoundaryChecking(false);
}

// eslint-disable-next-line prefer-destructuring
export const __CID__ = (window as any).__CID__;

export const countrySignSettings = {
  id: {
    negative: '-',
    float: ',',
    thousand: '.',
    negativeRe: /-/g,
    floatRe: /,/g,
    thousandRe: /\./g,
  },
  sg: {
    negative: '-',
    float: '.',
    thousand: ',',
    negativeRe: /-/g,
    floatRe: /\./g,
    thousandRe: /,/g,
  },
};

const MAX_PRECISION = 6;

export default (
  n: number | string,
  precision = Infinity,
  negative = countrySignSettings[__CID__].ngative || '-',
  float = countrySignSettings[__CID__].float || '.',
  thousand = countrySignSettings[__CID__].thousand || ',',
) => {
  if ((precision < 0 || precision > 100) && precision !== Infinity) {
    throw new Error('precision must between 0 and 100');
  }
  let x = n;
  if (typeof x === 'string') {
    x = +x;
  }
  if (1 / x === -Infinity) {
    return '-0';
  }
  const isNegative = x < 0;
  x = Math.abs(x);
  const restNumber = NP.minus(x, Math.floor(x));
  const restStr = precision === Infinity
    ? String(NP.strip(restNumber)).substring(0, 2 + MAX_PRECISION) // 2 is for "0."
    : precision > MAX_PRECISION
      ? NP.strip(restNumber, MAX_PRECISION).toFixed(MAX_PRECISION)
      : NP.strip(restNumber, precision || undefined).toFixed(precision);
  const result = (Math.floor(x) || 0).toString().replace(
    /(\d)(?=(?:\d{3})+$)/g,
    `$1${thousand}`,
  );
  return (isNegative ? negative : '')
    + result
    + (+restStr ? `${float}${restStr.substr(2)}` : '');
};
