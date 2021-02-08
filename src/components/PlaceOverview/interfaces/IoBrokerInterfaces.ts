export type T_ioBrokerServerConnectionState =
    | 'none'
    | 'connecting'
    | 'connected'
    | 'loading'
    | 'loaded'
    | 'disconnected';

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

export type T_ioBroker_Value = string | number | boolean | any[] | { [key: string]: any };

export interface I_ioBrokerState {
    ack?: boolean;
    from?: string;
    lc?: number;
    q?: number;
    ts?: number;
    user?: string;
    val: T_ioBroker_Value;
    _id: string;
    [key: string]: any;
}
