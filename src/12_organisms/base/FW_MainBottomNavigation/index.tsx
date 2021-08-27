import React from 'react';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Icon } from '@material-ui/core';
import { MainComponentsConfiguration, I_MainComponentsConfiguration } from '../../../2_configuration/MainComponents';
import FW_MoreMenu from '../../../14_pages/FW_MoreMenuPage';
import IconComponent from '../../../10_atoms/base/IconComponent';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            position: 'fixed',
            bottom: 0,
            left: 0,
            paddingBottom: 50,
            paddingTop: 20,
        },
    }),
);

export interface MainBottomNavigationProps {
    paramRef: React.RefObject<HTMLDivElement>;
}

// const MainBottomNavigation = (props: MainBottomNavigationProps): JSX.Element => {
const MainBottomNavigation = (): JSX.Element => {
    const classes = useStyles();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [value, setValue] = React.useState(0);
    const [moreMenuOpen, setMoreMenuOpen] = React.useState<boolean>(false);

    const getValue = () => {
        return location.pathname.split('/')[1];
    };

    const clickMoreMenu = () => {
        setMoreMenuOpen(true);
    };

    const buttons: I_MainComponentsConfiguration[] = MainComponentsConfiguration;

    return (
        <>
            <BottomNavigation
                value={getValue()}
                onChange={(event: any, newValue: any) => {
                    setValue(newValue);
                }}
                showLabels
                className={classes.root}
                // ref={props.paramRef}
            >
                {buttons
                    .filter((button) => button.onMainBottomNavigation !== undefined && button.onMainBottomNavigation)
                    .map((button: I_MainComponentsConfiguration, index: number) => (
                        <BottomNavigationAction
                            key={`MainBottomNavigation_${index}`}
                            component={Link}
                            value={button.value}
                            to={button.to ?? '/'}
                            label={button.label}
                            // icon={<Icon>{button.icon}</Icon>}
                            icon={<IconComponent icon={button.icon ?? ''} size="small" />}
                        />
                    ))}
                <BottomNavigationAction
                    label="More"
                    value="moreMenu"
                    icon={<Icon>more_horiz</Icon>}
                    onClick={() => clickMoreMenu()}
                />
            </BottomNavigation>
            {moreMenuOpen && <FW_MoreMenu isOpen={moreMenuOpen} setMoreMenuOpen={setMoreMenuOpen} />}
        </>
    );
};

export default MainBottomNavigation;
