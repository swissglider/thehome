import React from 'react';
import { useHistory } from 'react-router-dom';
import { TITLE_ICON_LINK } from '../../../configuration/Application';
import { MainComponentsConfiguration } from '../../../configuration/MainComponents';
import { I_LeftMenuListItem } from '../../../utils/FrameworkContext';
import LinksLeftList from './LinksLeftList';

const MoreMenu = (): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(true);
    const history = useHistory();

    const menuItems: I_LeftMenuListItem[] = MainComponentsConfiguration.filter(
        (c) => c.onMoreMenuNavigation !== undefined && c.onMoreMenuNavigation,
    ).map((c) => ({ name: c.label, to: c.to, icon: c.icon }));

    const menuList: I_LeftMenuListItem[][] = [
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
            <LinksLeftList
                isOpen={isMenuOpen}
                setIsMenuOpen={toggle}
                menuList={menuList}
                icon={TITLE_ICON_LINK}
                name={'More Menu'}
                fullWidth={true}
            />
        </>
    );
};

export default MoreMenu;
