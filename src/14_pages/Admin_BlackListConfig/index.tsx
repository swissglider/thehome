import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DataGrid, { SortDirection } from 'react-data-grid';
import { Checkbox, createStyles, makeStyles, Theme } from '@material-ui/core';
import { enumFunctionListState } from '../../32-recoil/admin/atomEnumFunctions';
import { useRecoilState, useRecoilValue } from 'recoil';
import { adminParamSelector } from '../../32-recoil/admin/atomAdminParams';
import SimpleButton from '../../10_atoms/base/SimpleButton';
import { getValueByLanguageFromObject } from '../../21_utils/DisplayNameHelper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttons: {
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
        },
        grid: {
            // height: '400px',
            // '& > *': {
            //     color: 'red',
            // },
        },
    }),
);

interface Row {
    id: string;
    name: string;
    blacklisted: boolean;
}

const columns = [
    // {key: 'id',name: '',},
    { key: 'name', name: 'Type' },
    {
        key: 'blacklisted',
        name: 'Blacklisted',
        // width: 100,
        formatter(props: any) {
            // console.log(props);
            return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Checkbox
                        style={{ color: 'black' }}
                        checked={props.row.blacklisted}
                        onChange={() => {
                            props.onRowChange({ ...props.row, blacklisted: !props.row.blacklisted });
                        }}
                    />
                </div>
            );
        },
    },
];

const Admin_BlackListConfig = (): JSX.Element => {
    const classes = useStyles({ classesProps1: '' });
    const enumFunctions = useRecoilValue(enumFunctionListState);
    const [blackList, setBlackList] = useRecoilState(adminParamSelector('BLACK_LIST_SENSOR_TYPES'));

    const [rows, setRows] = useState<Row[]>([]);
    const [[sortColumn, sortDirection], setSort] = useState<[string, SortDirection]>(['blacklisted', 'DESC']);
    const loadRowsFromIOB = () => {
        const rows_ = enumFunctions.map((e: any) => ({
            id: e.id,
            name: getValueByLanguageFromObject(e.value.common.name),
            blacklisted: blackList && Array.isArray(blackList) ? blackList.includes(e.id) : false,
        }));
        setRows(rows_);
    };
    useEffect(() => {
        loadRowsFromIOB();
    }, [blackList, enumFunctions]);

    const sortedRows: readonly Row[] = useMemo(() => {
        if (sortDirection === 'NONE') return rows;

        let sortedRows: Row[] = [...rows];

        const sortID = (a: Row, b: Row) => a.id.localeCompare(b.id);

        switch (sortColumn) {
            case 'id':
                sortedRows = sortedRows.sort(sortID);
                break;
            case 'name':
                sortedRows = sortedRows
                    .sort(sortID)
                    .sort((a, b) => (a[sortColumn] as string).localeCompare(b[sortColumn] as string));
                break;
            case 'blacklisted':
                sortedRows = sortedRows
                    .sort(sortID)
                    .sort((a, b) => (a[sortColumn] === b[sortColumn] ? 0 : b[sortColumn] ? 1 : -1));
                break;
            default:
        }

        return sortDirection === 'ASC' ? sortedRows.reverse() : sortedRows;
    }, [rows, sortDirection, sortColumn]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const rowChangedDate = (_rows: any, data: any) => {
        setRows(_rows);
    };

    const handleSort = useCallback((columnKey: string, direction: SortDirection) => {
        setSort([columnKey, direction]);
    }, []);

    const saveToIOB = () => {
        const rows_ = rows.filter((e: Row) => e.blacklisted).map((e: Row) => e.id);
        setBlackList(rows_);
    };
    const resetFromIOB = () => {
        loadRowsFromIOB();
    };

    return (
        <>
            <div className={classes.buttons}>
                <SimpleButton
                    text="Save"
                    onClick={() => saveToIOB()}
                    variant="outlined"
                    size="small"
                    color="secondary"
                />
                <SimpleButton
                    text="Reset"
                    onClick={() => resetFromIOB()}
                    variant="outlined"
                    size="small"
                    color="secondary"
                />
            </div>
            <DataGrid
                columns={columns}
                rows={sortedRows}
                defaultColumnOptions={{
                    sortable: true,
                    resizable: true,
                }}
                onRowsChange={rowChangedDate}
                // onSelectedRowsChange={() => console.log('onSelectedRowsChange')}
                // onFiltersChange={() => console.log('onFiltersChange')}
                // onExpandedGroupIdsChange={() => console.log('onExpandedGroupIdsChange')}
                // onRowClick={() => console.log('onRowClick')}
                // onSelectedCellChange={() => console.log('onSelectedCellChange')}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
                className={classes.grid}
            />
        </>
    );
};

export default Admin_BlackListConfig;
