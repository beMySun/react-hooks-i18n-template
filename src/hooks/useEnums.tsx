import React from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { useTranslate } from './useTranslate';

export interface OptionType {
  label: string;
  value: any;
}

const useEnums = (entry: string) => {
  const enums = useSelector((state: any) => state.global.systemEnumMap);
  const translate = useTranslate();
  if (!enums[entry]) {
    console.error(`entry ${entry} not exist!`);
    return {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      getText: (value: any) => undefined as any,
      getTranslateText: (value: any) => undefined as any,
      getValue: (text: string) => undefined as any,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      toOptions: () => [] as OptionType[],
      toTranslateOptions: () => [] as OptionType[],
      toSelectOptions: () => [] as JSX.Element[],
      toTranslateSelectOptions: () => [] as JSX.Element[],
    };
  }

  const entries = Object.entries(enums[entry] as Record<string, string>);

  const mapTextToValue = new Map<string, number | string>();
  const mapValueToText = new Map<number | string, string>();

  entries.forEach(([value, text]) => {
    mapTextToValue.set(text, +value);
    mapValueToText.set(+value, text);
  });

  const options: OptionType[] = entries.map(([value, label]) => ({
    value: +value,
    label,
  }));

  const translateOptions: OptionType[] = entries.map(([value, label]) => ({
    value: +value,
    label: translate(label),
  }));

  return {
    getText: (value: any) => mapValueToText.get(value) || undefined,
    getTranslateText: (value: any) => {
      const resultValue = mapValueToText.get(value);
      if (!resultValue) {
        return undefined;
      }
      return translate(`${resultValue}`) || resultValue;
    },
    getValue: (text: string) => mapTextToValue.get(text) || undefined,
    toOptions: () => options,
    toTranslateOptions: () => translateOptions,
    toSelectOptions: () => options.map(option => (
      <Select.Option
        key={option.value}
        value={option.value}
      >
        {option.label}
      </Select.Option>
    )),
    toTranslateSelectOptions: () => options.map(option => (
      <Select.Option
        key={option.value}
        value={option.value}
      >
        {translate(option.label)}
      </Select.Option>
    ))
  };
};

export default useEnums;
