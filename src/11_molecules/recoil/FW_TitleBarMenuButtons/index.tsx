import React from 'react';
import {
    makeStyles,
    Theme,
    createStyles,
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    ListItemIcon,
} from '@material-ui/core';
import SimpleButton from '../../../10_atoms/base/SimpleButton';
import { useHistory } from 'react-router-dom';
import { titleBarMenuButtonsState } from '../../../32-recoil/framework/atoms';
import { useRecoilValue } from 'recoil';
import { blueGrey } from '@material-ui/core/colors';
import { I_LinksConfiguration } from '../../../2_configuration/MainComponents';
import IconComponent from '../../../10_atoms/base/IconComponent';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(1),
            display: 'flex',
            justifyContent: 'space-around',
        },
    }),
);

const useStyleMenu = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        paper: {
            marginRight: theme.spacing(2),
        },
        buttons: {
            background: blueGrey[50],
        },
    }),
);

const MenuListComposition = (props: I_LinksConfiguration) => {
    const classes = useStyleMenu();
    const { to, subMenu, label, icon, ...args } = { ...props };
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const history = useHistory();

    const handleToggle = () => {
        if (to) history.push(to);
        else if (subMenu) setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    const onMenuItemClick = (event: React.MouseEvent<EventTarget>, props: I_LinksConfiguration) => {
        handleClose(event);
        if (props.to) history.push(props.to);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <div>
                <SimpleButton
                    startIcon={icon}
                    text={label}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    {...args}
                    onClick={handleToggle}
                    variant="text"
                    size="small"
                    className={classes.buttons}
                />
                {to === undefined && subMenu && (
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={open}
                                            id="menu-list-grow"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            {subMenu.map((e, index) => (
                                                <MenuItem
                                                    key={`MenuListComposition_MenuItem_${index}_${e.label}`}
                                                    onClick={(event) => onMenuItemClick(event, e)}
                                                >
                                                    <ListItemIcon>
                                                        {e.icon && <IconComponent icon={e.icon} size="small" />}
                                                    </ListItemIcon>
                                                    {e.label}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                )}
            </div>
        </div>
    );
};

const FW_TitleBarMenuButtons = (): JSX.Element => {
    const classes = useStyles({ active: true });
    const titleBarMenuButtons = useRecoilValue<I_LinksConfiguration[]>(titleBarMenuButtonsState);

    return (
        <div className={classes.root}>
            {titleBarMenuButtons.map((e, index: number) => (
                <MenuListComposition key={`FW_TitleBarMenuButtons_${index}`} {...e} />
            ))}
        </div>
    );
};

export default FW_TitleBarMenuButtons;
