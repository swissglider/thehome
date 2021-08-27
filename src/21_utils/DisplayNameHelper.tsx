import { LANGUAGE } from '../2_configuration/Application';

export const getValueByLanguageFromObject = (obj: { [key: string]: string } | string): string =>
    typeof obj === 'string' ? obj : LANGUAGE in obj ? obj[LANGUAGE] : 'en' in obj ? obj['en'] : obj.toString();
