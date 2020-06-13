export const CONSTANTS = {
  CHANGE_LANG: 'CHANGE_LANG',
  CHANGE_TRANSLATE_MODE: 'CHANGE_TRANSLATE_MODE',
  CHANGE_USER_INFO: 'CHANGE_USER_INFO',
  GET_SYSTEM_ENUMS: 'GET_SYSTEM_ENUMS',
};

export const changeLang = (lang: string) => ({
  type: CONSTANTS.CHANGE_LANG,
  lang,
});

export const changeTranslateMode = (translateMode: string) => ({
  type: CONSTANTS.CHANGE_TRANSLATE_MODE,
  translateMode,
});

export const changeUserInfo = (userInfo = {}) => ({
  type: CONSTANTS.CHANGE_USER_INFO,
  userInfo,
});
