import React from 'react';
import { useHistory } from 'react-router-dom';
import { TITLE_ICON_LINK } from '../../../2_configuration/Application';
import { MainComponentsConfiguration } from '../../../2_configuration/MainComponents';

const MoreMenu = (): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(true);
    const history = useHistory();

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

    const toggle = (isOpen: boolean) => {
        if (isOpen === false) {
            console.log('to close');
            history.go(-1);
        }
        setIsMenuOpen(isOpen);
    };

    return (
        <>
            <h1>Hallo</h1>
        </>
    );
};

export default MoreMenu;
