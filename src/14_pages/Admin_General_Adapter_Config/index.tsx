import React, { ComponentProps, useMemo } from 'react';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { foreignAdapterSelector } from '../../32-recoil/admin/atomAdpaterHandler';
import { useRecoilState } from 'recoil';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        classes1: {
            display: 'flex',
            paddingLeft: theme.spacing(1),
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
        },
        classes2: ({ classesProps1 }: { classesProps1?: string }) => {
            return {
                alignItems: classesProps1 ?? '',
            };
        },
    }),
);

const Admin_General_Adapter_Config = (): JSX.Element => {
    const classes = useStyles({ classesProps1: '' });
    const [deconz0Adapter, setDeconz0Adapter] = useRecoilState<any>(foreignAdapterSelector('system.adapter.deconz.0'));
    const [deconz1Adapter, setDeconz1Adapter] = useRecoilState<any>(foreignAdapterSelector('system.adapter.deconz.1'));
    const restartDeConzAdapter = () => {
        const tmpObj0 = { ...deconz1Adapter, common: { ...deconz0Adapter.common, enabled: false } };
        const tmpObj1 = { ...deconz1Adapter, common: { ...deconz1Adapter.common, enabled: false } };
        // const tmpCommon0 = { ...tmpObj0.common, enabled: false };
        // tmpCommon0.enabled = false;
        // tmpObj0.common = tmpCommon0;
        // console.log(deconz1Adapter);
        // console.log(tmpObj1);

        setDeconz0Adapter(tmpObj0);
        setDeconz1Adapter(tmpObj1);
        const tmpObj_0 = { ...deconz1Adapter, common: { ...deconz0Adapter.common, enabled: true } };
        const tmpObj_1 = { ...deconz1Adapter, common: { ...deconz1Adapter.common, enabled: true } };
        setDeconz0Adapter(tmpObj_0);
        setDeconz1Adapter(tmpObj_1);
    };
    return (
        <div className={classes.classes1}>
            <Button onClick={restartDeConzAdapter}>Restart DeCont Adapters</Button>
        </div>
    );
};

export default Admin_General_Adapter_Config;
