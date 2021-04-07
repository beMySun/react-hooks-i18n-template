import logoID from '@/assets/logo192.png';

// import logoID from '@/assets/logo/logo_32_id.png';
// import logoVN from '@/assets/logo/logo_32_vn.png';
// import logoTW from '@/assets/logo/logo_32_tw.png';
// import logoPH from '@/assets/logo/logo_32_ph.png';

const getCountry = () => {
  const country = (window as any).__CID__ || 'id';
  return country;
}

const langMap = {
  en_US: 'English',
  id_ID: 'Bahasa',
  // vi_VN: 'Vietnamese',
  // zh_TW: '繁體中文',
  // zh_CN: '简体中文',
};


export const langSettings = {
  id: [{
    lang_id: 1,
    label: 'English',
    value: 'en_US',
  },
  {
    lang_id: 6,
    label: 'Bahasa',
    value: 'id_ID'
  }],
  vn: [{
    lang_id: 1,
    label: 'English',
    value: 'en_US',
  },
  {
    lang_id: 3,
    label: 'Vietnamese',
    value: 'vi_VN'
  }],
  tw: [{
    lang_id: 1,
    label: 'English',
    value: 'en_US',
  },
  {
    lang_id: 10,
    label: '繁體中文',
    value: 'zh_TW'
  }],
  ph: [{
    lang_id: 1,
    label: 'English',
    value: 'en_US',
  },
  {
    lang_id: 5,
    label: '简体中文',
    value: 'zh_CN',
  }],
};

const defaultLangSetting = [{
  lang_id: 1,
  label: 'English',
  value: 'en_US',
},
{
  lang_id: 6,
  label: 'Bahasa',
  value: 'id_ID'
}];

export const getLangOptions = () => langSettings[getCountry()] || defaultLangSetting;

export const logoSettings = {
  id: logoID,
};

export const getLogoSrc = () => logoSettings[getCountry()]

export const registerLinkSettings = {
  id: 'http://bit.ly/oku',
  vn: 'https://docs.enO4w/viewform',
  tw: 'http://bit.ly/koee',
  ph: 'https://forms.gl',
};

export const getRegisterLink = () => registerLinkSettings[getCountry()];

export default langMap;
