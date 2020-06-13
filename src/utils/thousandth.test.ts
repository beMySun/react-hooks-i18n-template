import NP from 'number-precision';
import thousandth from './thousandth';

NP.enableBoundaryChecking(false);

test('normal situations', () => {
  expect(thousandth(0)).toBe('0');
  expect(thousandth(1)).toBe('1');
  expect(thousandth(12)).toBe('12');
  expect(thousandth(123)).toBe('123');
  expect(thousandth(1234)).toBe('1,234');
  expect(thousandth(12345)).toBe('12,345');
  expect(thousandth(123456)).toBe('123,456');
  expect(thousandth(1234567)).toBe('1,234,567');
  expect(thousandth(12345678)).toBe('12,345,678');
  expect(thousandth(123456789)).toBe('123,456,789');
});

test('negative numbers', () => {
  expect(thousandth(-0)).toBe('-0');
  expect(thousandth(-1)).toBe('-1');
  expect(thousandth(-12)).toBe('-12');
  expect(thousandth(-123)).toBe('-123');
  expect(thousandth(-1234)).toBe('-1,234');
  expect(thousandth(-12345)).toBe('-12,345');
  expect(thousandth(-123456)).toBe('-123,456');
  expect(thousandth(-1234567)).toBe('-1,234,567');
  expect(thousandth(-12345678)).toBe('-12,345,678');
  expect(thousandth(-123456789)).toBe('-123,456,789');
});

test('floats, max 6 digits', () => {
  expect(thousandth(-1.1)).toBe('-1.1');
  expect(thousandth(-12.12)).toBe('-12.12');
  expect(thousandth(-123.123)).toBe('-123.123');
  expect(thousandth(-1234.1234)).toBe('-1,234.1234');
  expect(thousandth(-12345.12345)).toBe('-12,345.12345');
  expect(thousandth(-123456.123456)).toBe('-123,456.123456');
  expect(thousandth(-1234567.123456)).toBe('-1,234,567.123456');
  expect(thousandth(-12345678.123456)).toBe('-12,345,678.123456');
  expect(thousandth(-123456789.123456)).toBe('-123,456,789.123456');
});

test('normal situations for string input', () => {
  expect(thousandth('0')).toBe('0');
  expect(thousandth('1')).toBe('1');
  expect(thousandth('12')).toBe('12');
  expect(thousandth('123')).toBe('123');
  expect(thousandth('1234')).toBe('1,234');
  expect(thousandth('12345')).toBe('12,345');
  expect(thousandth('123456')).toBe('123,456');
  expect(thousandth('1234567')).toBe('1,234,567');
  expect(thousandth('12345678')).toBe('12,345,678');
  expect(thousandth('123456789')).toBe('123,456,789');
});

test('negative numbers for string input', () => {
  expect(thousandth('-0')).toBe('-0');
  expect(thousandth('-1')).toBe('-1');
  expect(thousandth('-12')).toBe('-12');
  expect(thousandth('-123')).toBe('-123');
  expect(thousandth('-1234')).toBe('-1,234');
  expect(thousandth('-12345')).toBe('-12,345');
  expect(thousandth('-123456')).toBe('-123,456');
  expect(thousandth('-1234567')).toBe('-1,234,567');
  expect(thousandth('-12345678')).toBe('-12,345,678');
  expect(thousandth('-123456789')).toBe('-123,456,789');
});

test('floats, max 6 digits for string input', () => {
  expect(thousandth('0.0')).toBe('0');
  expect(thousandth('-0.0')).toBe('-0');
  expect(thousandth('-1.10')).toBe('-1.1');
  expect(thousandth('-12.120')).toBe('-12.12');
  expect(thousandth('-123.1230')).toBe('-123.123');
  expect(thousandth('-1234.12340')).toBe('-1,234.1234');
  expect(thousandth('-12345.123450')).toBe('-12,345.12345');
  expect(thousandth('-123456.1234560')).toBe('-123,456.123456');
  expect(thousandth('-1234567.1234560')).toBe('-1,234,567.123456');
  expect(thousandth('-12345678.1234560')).toBe('-12,345,678.123456');
  expect(thousandth('-123456789.1234560')).toBe('-123,456,789.123456');
});

test('floats, with precision', () => {
  expect(thousandth(-1.1, 4)).toBe('-1.1000');
  expect(thousandth(-12.12, 4)).toBe('-12.1200');
  expect(thousandth(-123.123, 4)).toBe('-123.1230');
  expect(thousandth(-1234.1234, 4)).toBe('-1,234.1234');
  expect(thousandth(-12345.12345, 4)).toBe('-12,345.1235');
  expect(thousandth(-123456.123456, 4)).toBe('-123,456.1235');
  expect(thousandth(-1234567.123456, 4)).toBe('-1,234,567.1235');
  expect(thousandth(-12345678.123456, 4)).toBe('-12,345,678.1235');
  expect(thousandth(-123456789.123456, 4)).toBe('-123,456,789.1235');
});

test('floats, precision is large', () => {
  expect(thousandth(-1.1, 40)).toBe('-1.100000');
  expect(thousandth(-12.12, 40)).toBe('-12.120000');
  expect(thousandth(-123.123, 40)).toBe('-123.123000');
  expect(thousandth(-1234.1234, 40)).toBe('-1,234.123400');
  expect(thousandth(-12345.12345, 40)).toBe('-12,345.123450');
  expect(thousandth(-123456.123456, 40)).toBe('-123,456.123456');
  expect(thousandth(-1234567.123456, 40)).toBe('-1,234,567.123456');
  expect(thousandth(-12345678.123456, 40)).toBe('-12,345,678.123456');
  expect(thousandth(-123456789.123456, 40)).toBe('-123,456,789.123456');
});

test('exceptions', () => {
  expect(() => thousandth(0, -1)).toThrow();
  expect(() => thousandth(0, 101)).toThrow();
});
