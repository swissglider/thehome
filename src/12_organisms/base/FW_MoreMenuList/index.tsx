import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Grid, Icon, IconButton, Toolbar } from '@material-ui/core';
import TypographyComponent from '../../../10_atoms/base/TypographyComponent';
import MoreMenuTreeView from './tree';
import { I_LinksConfiguration } from '../../../2_configuration/MainComponents';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: '100vw',
        },
        root: {
            background: theme.palette.background.paper,
            zIndex: theme.zIndex.appBar,
            width: '100%',
            paddingTop: theme.spacing(1),
            marginBottom: theme.spacing(4),
        },
        treeRoot: {
            margin: theme.spacing(2),
        },
    }),
);

export interface FW_MoreMenuList_Props {
    isOpen: boolean;
    setIsMenuOpen: any;
    menuList: I_LinksConfiguration[];
}

const FW_MoreMenuList = (props: FW_MoreMenuList_Props): JSX.Element => {
    const classes = useStyles();

    const toggleDrawer = (open: boolean, notToogle?: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (notToogle !== undefined && notToogle === true) return;
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        props.setIsMenuOpen(open);
    };

    return (
        <SwipeableDrawer anchor="left" open={props.isOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
            <div className={classes.list} role="presentation">
                <Toolbar className={classes.root}>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container direction="row" justify="space-between" alignItems="center" item>
                                <Grid item></Grid>
                                <Grid item xs>
                                    <TypographyComponent align="center" noWrap={true} variant="h4">
                                        More Menu
                                    </TypographyComponent>
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                                        <Icon>close</Icon>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
                <div className={classes.treeRoot}>
                    <MoreMenuTreeView setIsMenuOpen={props.setIsMenuOpen} menuList={props.menuList} />
                </div>
            </div>
        </SwipeableDrawer>
    );
};

export default FW_MoreMenuList;
