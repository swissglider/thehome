export const TITLE_ICON_LINK = process.env.NODE_ENV === 'production' ? '/thehome/logo180.png' : '/logo180.png';
export const IOBROKER_URL_IOSOCKET = 'http://192.168.90.1:8082';
// export const IOBROKER_NAME = 'thehome';
export const IOBROKER_NAME = 'test-react';
export const IOBROKER_INSTANCE = '0';
export const LANGUAGE = (window as { [key: string]: any }).usrlang?.substring(0, 2) ?? 'de';
