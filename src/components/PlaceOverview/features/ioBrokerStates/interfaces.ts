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
