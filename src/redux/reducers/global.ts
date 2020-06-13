import { AnyAction } from 'redux';
import { CONSTANTS } from '../actions/global';

export default (
  state = {
    lang: 'en_US',
    translateMode: 'translate-value',
    isLogin: false,
    userName: '',
    role: null,
    hasInitialized: false,
  },
  action: AnyAction,
) => {
  switch (action.type) {
    case CONSTANTS.CHANGE_LANG:
      return {
        ...state,
        lang: action.lang,
      };
    case CONSTANTS.CHANGE_TRANSLATE_MODE:
      return {
        ...state,
        translateMode: action.translateMode,
      };
    case CONSTANTS.CHANGE_USER_INFO:
      return {
        ...state,
        ...action.userInfo,
      };
    case CONSTANTS.GET_SYSTEM_ENUMS:
      return {
        ...state,
        systemEnumMap: action.payload,
      };
    default:
      return state;
  }
};
