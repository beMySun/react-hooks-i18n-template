/* eslint-disable camelcase */
import React from 'react';
import { ConfigProvider } from 'antd';
import { connect } from 'react-redux';
import id_ID from 'antd/lib/locale-provider/id_ID';
import en_US from 'antd/lib/locale-provider/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import cookies from 'js-cookie';
import { IntlProvider } from 'react-intl';

import enMessages from '@/i18n/locales/en_US.json';
import idMessages from '@/i18n/locales/id_ID.json';

const localeMap = {
  id_ID,
  en_US,
};

const dayjsLocaleMap = {
  id_ID: 'id',
  en_US: 'en',
};

const intlMap = {
  en_US: 'en',
  id_ID: 'id',
};

const messagesMap = {
  en_US: enMessages,
  id_ID: idMessages,
};

export const countryCodeMap = {
  en_US: 1,
  id_ID: 6,
};

const rootStore = ({ global: { lang } }: any) => ({ lang });

interface PropTypes {
  lang: any;
}

const _Intl: React.FC<PropTypes> = ({ children, lang }) => (
  <IntlProvider locale={intlMap[lang]} messages={messagesMap[lang]}>
    {children}
  </IntlProvider>
);

export const Intl = connect(rootStore)(_Intl);

const Locale: React.FC<PropTypes> = ({ children, lang }) => {
  React.useEffect(() => {
    dayjs.locale(dayjsLocaleMap[lang]);
    cookies.set('language_id', countryCodeMap[lang]);
    const root = document.querySelector('html');
    if (root) {
      root.className = lang;
    }
  }, [lang]);
  return (
    <ConfigProvider
      locale={localeMap[lang]}
      getPopupContainer={(node: any) => {
        if (node) {
          return node.parentNode;
        }
        return document.body;
      }}
    >
      <Intl>{children}</Intl>
    </ConfigProvider>
  );
};

export default connect(rootStore)(Locale);
