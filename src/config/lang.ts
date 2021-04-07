import logoID from '@/assets/logo/logo_32_id.png';
import logoVN from '@/assets/logo/logo_32_vn.png';
import logoTW from '@/assets/logo/logo_32_tw.png';
import logoPH from '@/assets/logo/logo_32_ph.png';

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
  vn: logoVN,
  tw: logoTW,
  ph: logoPH,
};

export const getLogoSrc = () => logoSettings[getCountry()] || logoID;

export const registerLinkSettings = {
  id: 'http://bit.ly/registrasistoku',
  vn: 'https://docs.google.com/forms/d/e/1FAIpQLSfpTkiZPxhHJHSZ6YRqDFtNX6-nd5_3gMQ1a3sipoATy6nO4w/viewform',
  tw: 'http://bit.ly/konsultasishopee',
  ph: 'https://forms.gle/8tEJs2MmvjK545Rz5',
};

export const getRegisterLink = () => registerLinkSettings[getCountry()];

export const feedbackLinkSettings = {
  id: 'http://bit.ly/feedbackgudangkuLP',
  vn: 'https://help.shopee.vn/vn/s/webform',
  tw: 'http://bit.ly/feedbackgudangkuLP',
  ph: 'https://forms.gle/xkvdGDTvQEDy9vjg9',
};

export const getFeedbackLink = () => feedbackLinkSettings[getCountry()];

export const helpLinkSettings = {
  id: {
    USERGUIDE_LINK: 'https://sites.google.com/shopee.com/stoku-help/beranda?authuser=0',
    FEEDBACK_LINK: 'https://docs.google.com/forms/d/1VfGsJIbNI5G-I6WP7538SMdAnqntvS_FoyYm9Tlgaqg/',
  },
  vn: {
    USERGUIDE_LINK: 'https://banhang.shopee.vn/edu/article/3722',
    FEEDBACK_LINK: 'https://help.shopee.vn/vn/s/webform',
  },
  tw: {
    USERGUIDE_LINK: 'https://drive.google.com/drive/folders/1mAPMEU2BM7BlrJEffX7ts4PQ9FHWe_Ck',
    FEEDBACK_LINK: 'https://bit.ly/feedbackgdkexisting',
  },
  ph: {
    USERGUIDE_LINK: 'https://seller.shopee.ph/edu/article/5674',
    FEEDBACK_LINK: 'https://forms.gle/xkvdGDTvQEDy9vjg9',
  },
};

export const getHelpLink = () => helpLinkSettings[getCountry()];

export default langMap;
