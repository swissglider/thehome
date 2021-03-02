export type T_ioBrokerServerConnectionState =
    | 'none'
    | 'connecting'
    | 'connected'
    | 'loading'
    | 'loaded'
    | 'disconnected';

export type T_MEMBER_STATE_IDS = {
    [fType: string]: string[];
};

export interface I_HOME_CONTAINER {
    id: string;
    memberEnumsIDs: string[];
    localMemberStateIDs: T_MEMBER_STATE_IDS;
    recursiveMemberStateIDs: T_MEMBER_STATE_IDS;
    childrenHomeContainers: I_HOME_CONTAINER[];
    initialized: 'none' | 'loading' | 'ok' | 'error';
    error: string | undefined;
}
