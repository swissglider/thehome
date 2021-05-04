import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import ConfigListComponent, { newItemString, T_ConfigList } from '..';
import { adminParamSelector, adminParamsSelector } from '../../../32-recoil/admin/atomAdminParams';
import { I_ConfigListParams } from '../interfaces/I_ConfigList';
import { IOBrokerSearchDialog } from './IOBrokerSearchDialog';

export const IOBrokerAdapterConfigList_ = (props: {
    configListParams: I_ConfigListParams;
    ioBConfigListName: string;
}): JSX.Element => {
    const [itemsState, setItemsState] = useState<T_ConfigList>([]);
    const [showSearchDialog, setShowSearchDialog] = useState<boolean>(false);
    const [indexSearchDialog, setIndexShowSearchDialog] = useState<number>();
    const [valueSearchDialog, setvalueShowSearchDialog] = useState<string>();
    const [superList, setSuperList] = useRecoilState<any>(adminParamSelector(props.ioBConfigListName));

    const setSavedItemList = (): void => {
        let listToSet: T_ConfigList = [];
        console.log(superList);
        listToSet = superList
            ? superList.map((item: string, index: number) => ({
                  id: index.toString(),
                  name: item,
              }))
            : [];

        setItemsState(listToSet);
    };

    useEffect(() => {
        console.log('useEffect');
        setSavedItemList();
    }, [props.ioBConfigListName, superList]);

    const updateList = (configList: T_ConfigList): void => {
        const tmpAdminParams = { ...superList };
        tmpAdminParams[props.ioBConfigListName] = configList.map((e) => e.name);
        setSuperList(tmpAdminParams);
    };

    const addItem = () => {
        const result = Array.from(itemsState);
        result.unshift({ name: newItemString, id: (result.length + 1).toString() });
        updateList(result);
    };

    const reloadList = (): void => {
        setSavedItemList();
    };

    const onSearchCancel = () => {
        setShowSearchDialog(false);
    };

    const onSearchOK = (newString: string) => {
        const result = Array.from(itemsState);
        if (indexSearchDialog !== undefined && newString !== undefined) {
            if (result[indexSearchDialog].name !== newString) {
                result[indexSearchDialog].name = newString;
                updateList(result);
            }
        } else if (indexSearchDialog !== undefined && valueSearchDialog !== undefined) {
            if (result[indexSearchDialog].name !== valueSearchDialog) {
                result[indexSearchDialog].name = valueSearchDialog;
                updateList(result);
            }
        }
        onSearchCancel();
    };

    const searchItem = (index: number): void => {
        const result = Array.from(itemsState);
        if (result[index].name === newItemString) {
            result[index].name = 'newItem' + '**';
        }

        setIndexShowSearchDialog(index);
        setvalueShowSearchDialog(result[index].name);
        setShowSearchDialog(true);

        // setShowSearchDialog(false);
        // updateList(result);
    };

    return (
        <>
            <ConfigListComponent
                {...props.configListParams}
                configList={itemsState}
                addItem={addItem}
                reloadList={reloadList}
                updateList={updateList}
                searchItem={searchItem}
            />
            {/* <IOBrokerSearchDialog
                ioBContext={props.ioBContext}
                showDialog={showSearchDialog}
                onOk={onSearchOK}
                onCancel={onSearchCancel}
                defaultValue={valueSearchDialog}
            /> */}
        </>
    );
};
export const IOBrokerAdapterConfigList = (props: {
    configListParams: I_ConfigListParams;
    ioBConfigListName: string;
}): JSX.Element => {
    return (
        <IOBrokerAdapterConfigList_
            configListParams={props.configListParams}
            ioBConfigListName={props.ioBConfigListName}
        />
    );
};
