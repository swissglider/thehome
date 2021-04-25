import React, { ComponentProps, useEffect, useMemo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSetRecoilState } from 'recoil';
import { mainTitleState } from '../../32-recoil/framework/atoms';

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

export interface I_Admin_MainPage_Props {
    props1?: string;
}

const Admin_MainPage = (props: I_Admin_MainPage_Props): JSX.Element => {
    const classes = useStyles({ classesProps1: '' });
    const setMainTitle = useSetRecoilState<string>(mainTitleState);
    useEffect(() => {
        setMainTitle('Admin - Panel');
    }, []);
    const string1 = useMemo(() => {
        return 'Admin Main Page';
    }, [props.props1]);
    return <div className={classes.classes1}>{string1}</div>;
};

export default Admin_MainPage;
