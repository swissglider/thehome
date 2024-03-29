import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import IconComponent from '../../../10_atoms/base/IconComponent';
import TypographyComponent from '../../../10_atoms/base/TypographyComponent';
import { TITLE_ICON_LINK } from '../../../2_configuration/Application';
import { mainTitleState, titleBarSubElementState, T_TitleBarSubElements } from '../../../32-recoil/framework/atoms';
import { historyState, I_HistoryStateProps } from '../../../32-recoil/framework/atoms';
import BackComponent from '../BackComponent';
import FW_TitleBarBreadcrumbs from '../FW_TitleBarBreadcrumbs';
import FW_TitleBarMenuButtons from '../FW_TitleBarMenuButtons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: theme.palette.background.paper,
            position: 'fixed',
            zIndex: theme.zIndex.appBar,
            width: '100%',
            // top: 0,
            // left: 0,
            paddingTop: theme.spacing(1),
        },
    }),
);

const FW_TitleBar = (): JSX.Element => {
    const classes = useStyles();
    const historyArray = useRecoilValue<I_HistoryStateProps[]>(historyState);
    const mainTitle = useRecoilValue<string>(mainTitleState);
    const titleBarSubElement = useRecoilValue<T_TitleBarSubElements>(titleBarSubElementState);

    return (
        // <AppBar position="fixed" color="transparent">
        <Toolbar className={classes.root}>
            <Grid container direction="column">
                <Grid item>
                    <Grid container direction="row" justify="space-between" alignItems="center" item>
                        <Grid item>
                            <BackComponent />
                        </Grid>
                        <Grid item xs>
                            {historyArray.length < 2 && (
                                <TypographyComponent align="center" noWrap={true} variant="h4">
                                    {mainTitle}
                                </TypographyComponent>
                            )}
                        </Grid>
                        <Grid item>
                            <IconComponent icon={TITLE_ICON_LINK} variants="rounded" />
                        </Grid>
                    </Grid>
                </Grid>
                {titleBarSubElement !== undefined && titleBarSubElement !== 'empty' && (
                    <Grid item>
                        {titleBarSubElement === 'breadcrumbs' && <FW_TitleBarBreadcrumbs />}
                        {titleBarSubElement === 'menubuttons' && <FW_TitleBarMenuButtons />}
                    </Grid>
                )}
            </Grid>
        </Toolbar>
        // </AppBar>
    );
};

export default FW_TitleBar;
