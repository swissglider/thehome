import { LANGUAGE } from '../configuration/Application';
import { I_ioBrokerObject } from '../features/ioBrokerObjects/interfaces';

const getValueByLanguageFromObject = (obj: { [key: string]: string } | string): string =>
    typeof obj === 'string' ? obj : LANGUAGE in obj ? obj[LANGUAGE] : 'en' in obj ? obj['en'] : obj.toString();

const getDisplayNameByObject = (ioBObject: I_ioBrokerObject): string => {
    const displayName = ioBObject.native?.swissglider?.general?.displayName;
    return displayName !== undefined
        ? getValueByLanguageFromObject(displayName)
        : getValueByLanguageFromObject(ioBObject.common.name);
};

const IOBrokerNameTools = {
    getDisplayNameByObject: getDisplayNameByObject,
    getValueByLanguageFromObject: getValueByLanguageFromObject,
};

export default IOBrokerNameTools;
