import React from 'react';
import { makeStyles, Theme, createStyles, Button } from '@material-ui/core';
import { useRecoilValue, useRecoilState } from 'recoil';
import { adminParamSelector } from '../../32-recoil/admin/atomAdminParams';
import { servConnLogedInUserSelector } from '../../32-recoil/admin/atomServerConnection';

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

const AdminHome = (): JSX.Element => {
    const classes = useStyles({ classesProps1: '' });
    const servConnLogedInUser = useRecoilValue(servConnLogedInUserSelector);
    const [optTest, setOptTest] = useRecoilState(adminParamSelector('optTest'));

    // console.log(enumFunctions);

    const onClick1 = (value: number) => {
        setOptTest(value + 1);
    };

    return (
        <>
            <div className={classes.classes1}>{`Connected with User: ${servConnLogedInUser}`}</div>
            <div className={classes.classes1}>{`OptTest : ${optTest}`}</div>
            <Button variant="outlined" color="secondary" onClick={() => onClick1(optTest as number)}>
                Add 1 to {optTest}
            </Button>
            {/* <Page5 /> */}
        </>
    );
};

export default AdminHome;
