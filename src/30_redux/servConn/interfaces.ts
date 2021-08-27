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

export type T_HOME_CONTAINER_LIST = { [id: string]: I_HOME_CONTAINER };

export interface I_HOME_CONTAINER {
    id: string;
    memberEnumsIDs: string[];
    localMemberStateIDs: T_MEMBER_STATE_IDS;
    recursiveMemberStateIDs: T_MEMBER_STATE_IDS;
    childrenHomeContainers: T_HOME_CONTAINER_LIST;
    initialized: 'none' | 'loading' | 'ok' | 'error';
    error: string | undefined;
}
