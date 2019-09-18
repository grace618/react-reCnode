import i18n from 'i18next';
import {
  initReactI18next,
} from 'react-i18next';
import {
  getLanguage,
} from 'utils/i18n.js';
import cnCommon from './zh_CN/common';
import cnMenu from './zh_CN/menu';
import cnProfile from './zh_CN/profile';

import twCommon from './zh_TW/common';
import twMenu from './zh_TW/menu';
import twProfile from './zh_TW/profile';

const resources = {
  zh_CN: {
    common: { // 这是namespace的名称
      ...cnCommon, // 公共部分
      ...cnProfile, // 注册登录
    },
    menu: { // 这是namespace的名称
      ...cnMenu, // 左侧菜单
    },
  },
  zh_TW: {
    common: { // 这是namespace的名称
      ...twCommon, // 公共部分
      ...twProfile, // 注册登录
    },
    menu: { // 这是namespace的名称
      ...twMenu, // 左侧菜单
    },
  },
};

i18n
// pass the i18n instance to react-i18next.
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getLanguage(),

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
