import React from 'react';
import FW_MoreMenuList from '../../12_organisms/base/FW_MoreMenuList';
import { TITLE_ICON_LINK } from '../../2_configuration/Application';
import { MainComponentsConfiguration } from '../../2_configuration/MainComponents';

const FW_MoreMenu = (props: { isOpen: boolean; setMoreMenuOpen: (isOpen: boolean) => void }): JSX.Element => {
    console.log(props);

    const menuItems = MainComponentsConfiguration.filter(
        (c) => c.onMoreMenuNavigation !== undefined && c.onMoreMenuNavigation,
    ).map((c) => ({ name: c.label, to: c.to, icon: c.icon }));

    const menuList = [
        menuItems,
        [
            { name: 'test1', to: 'test1' },
            { name: 'test2', to: 'test1' },
            { name: 'test3', to: 'test1' },
            { name: 'test4', to: 'test1' },
        ],
    ];

    return (
        <>
            <FW_MoreMenuList
                isOpen={props.isOpen}
                setIsMenuOpen={props.setMoreMenuOpen}
                menuList={menuList}
                icon={TITLE_ICON_LINK}
                name={'More Menu'}
                fullWidth={true}
            />
        </>
    );
};

export default FW_MoreMenu;
