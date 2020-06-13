import { useIntl, IntlShape } from 'react-intl';
import { PrimitiveType } from 'intl-messageformat/lib/intl-messageformat.d';
import { state } from '@/redux/store';

type FormatterType = <T extends string | string[] | Record<string, any>>(
  id: T,
  values?: Record<string, any>,
) => T

let formatter: FormatterType | null = null;

const { global: { translateMode } } = state;

const getFormatter = (intl: IntlShape) => {
  const func = <T extends string | string[] | Record<string, any>>(
    id: T,
    values: Record<string, PrimitiveType | React.ReactElement> = {},
  ): T => {
    if (translateMode === 'translate-key') {
      return id;
    }
    switch (typeof id) {
      case 'string':
        return intl.formatMessage({ id }, values) as T;
      case 'object':
        if (Array.isArray(id)) {
          return id.map(t => func(t, values)) as T;
        }
        const o = {};
        Object.keys(id).forEach(key => { o[key] = func(id[key], values); });
        return o as T;
      default:
        return id;
    }
  };
  // don't need memoize because IntlProvider has its own private cache
  return func;
};

export function useTranslate() {
  const intl = useIntl();
  if (!formatter) {
    formatter = getFormatter(intl);
  }
  return formatter;
}
