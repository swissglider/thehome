import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid, Icon, IconButton, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import TypographyComponent from '../../../10_atoms/base/TypographyComponent';

interface StyleProps {
    fullWith: boolean;
}

export interface I_LeftMenuListItem {
    name: string;
    icon?: string;
    to: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: (props: StyleProps) => {
            return {
                width: props.fullWith ? '100vw' : '80vw',
            };
        },
        fullList: {
            width: 'auto',
        },
        root: {
            background: theme.palette.background.paper,
            zIndex: theme.zIndex.appBar,
            width: '100%',
            paddingTop: theme.spacing(1),
            marginBottom: theme.spacing(4),
        },
    }),
);

const Anchor = 'left';

const ListElement = (props: { item: I_LeftMenuListItem }): JSX.Element => (
    <ListItem button component={Link} to={props.item.to}>
        {props.item.icon !== undefined && (
            <ListItemIcon>
                <Icon>{props.item.icon}</Icon>
            </ListItemIcon>
        )}
        <ListItemText primary={props.item.name} />
    </ListItem>
);

const FW_MoreMenuList = (props: {
    isOpen: boolean;
    setIsMenuOpen: any;
    menuList: I_LeftMenuListItem[][];
    icon: string;
    name: string;
    fullWidth: boolean;
}): JSX.Element => {
    const classes = useStyles({ fullWith: props.fullWidth });

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        props.setIsMenuOpen(open);
    };

    const list = () => (
        <div className={classes.list} role="presentation">
            <Toolbar className={classes.root}>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container direction="row" justify="space-between" alignItems="center" item>
                            <Grid item></Grid>
                            <Grid item xs>
                                <TypographyComponent align="center" noWrap={true} variant="h4">
                                    {props.name}
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
            {props.menuList.map((menuCategory: I_LeftMenuListItem[], index: number) => (
                <div key={`LinksLeftList1_${index}`}>
                    <Divider />
                    {menuCategory.map((menuItem: I_LeftMenuListItem, index1: number) => (
                        <ListElement key={`LinksLeftList2_${index1}`} item={menuItem} />
                    ))}
                </div>
            ))}
        </div>
    );

    return (
        <SwipeableDrawer anchor={Anchor} open={props.isOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
            {list()}
        </SwipeableDrawer>
    );
};

export default FW_MoreMenuList;
