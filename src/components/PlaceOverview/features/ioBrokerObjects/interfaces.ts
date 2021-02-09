//IoB Object / State / Enum etc
export interface I_ioBrokerObject {
    common: {
        name: string | { [key: string]: string };
        icon?: string;
    };
    native: {
        swissglider?: {
            general?: {
                channelName?: string | { [key: string]: string };
                deviceName?: string | { [key: string]: string };
                adapterName?: string;
                instanceName?: string;
                instanceNunber?: string;
                stateName?: string | { [key: string]: string };
                displayName?: string | { [key: string]: string };
            };
        };
    };
    type: string;
    _id: string;
    [key: string]: any;
}
