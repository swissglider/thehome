import React from 'react';
import FW_MoreMenuList from '../../12_organisms/base/FW_MoreMenuList';
import { HOME_ICON } from '../../2_configuration/Icons';
import {
    I_LinksConfiguration,
    MainComponentsConfiguration,
    SubComponentsConfiguration,
} from '../../2_configuration/MainComponents';

const FW_MoreMenu = (props: { isOpen: boolean; setMoreMenuOpen: (isOpen: boolean) => void }): JSX.Element => {
    const menuList: I_LinksConfiguration[] = [
        { label: 'Main', icon: HOME_ICON, subMenu: MainComponentsConfiguration },
        ...SubComponentsConfiguration,
    ];

    return (
        <>
            <FW_MoreMenuList isOpen={props.isOpen} setIsMenuOpen={props.setMoreMenuOpen} menuList={menuList} />
        </>
    );
};

export default FW_MoreMenu;
