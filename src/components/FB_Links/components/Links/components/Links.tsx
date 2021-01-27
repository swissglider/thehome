import React, { useContext, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { RootState } from '../../../../../redux/Store';
import { I_Link, I_LinkFolder, LinkFolders } from '../interfaces/interfaces';
import LinkFolder from './LinkFolder';
import { FrameworkContext } from '../../../../../utils/FrameworkContext';
import isAuthenticated from '../../../utils/isAuthenticated';
import { getMainComponentsConfigurationByLabel } from '../../../../../configuration/MainComponents';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStylesLists = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: 0,
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
        },
    }),
);

const Links = (): JSX.Element => {
    const classes = useStylesLists();
    const [context, setContext] = useContext(FrameworkContext);

    isAuthenticated(true);

    useEffect(() => {
        const context_ = { ...context };
        context_.title = 'Links';
        const hL = getMainComponentsConfigurationByLabel('Links').to;
        context_.subNavButtons = [
            { title: 'logout', to: `${hL}/logout`, icon: 'login' },
            { title: 'addLink', to: `${hL}/addLink`, icon: 'add' },
        ];
        context_.component = <div>Links</div>;
        setContext(context_);
    }, []);

    useFirestoreConnect({
        collection: `links`,
        storeAs: 'links',
    });

    const links = useSelector((state: RootState) => state.firestore.data.links);

    if (links === undefined) return <></>;

    const linkFolders: LinkFolders = {};
    for (const [id, link] of Object.entries(links)) {
        // const link_ = link as I_Link;
        const link_ = { ...(link as I_Link), id: id };
        if (!(link_.folder in linkFolders)) {
            linkFolders[link_.folder] = { folder: link_.folder, links: [] };
        }
        linkFolders[link_.folder].links.push(link_);
    }

    return (
        <>
            {links !== undefined && (
                <div className={classes.root}>
                    {Object.values(linkFolders).map((linkFolder: I_LinkFolder, index) => (
                        <LinkFolder key={`fb_links_${index}`} linkFolder={linkFolder} />
                    ))}
                </div>
            )}
        </>
    );
};

export default Links;
