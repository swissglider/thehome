import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { I_LinksConfiguration } from '../../../2_configuration/MainComponents';
import IconComponent from '../../../10_atoms/base/IconComponent';
import { ListItemIcon } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useTreeItemStyles = makeStyles((theme: Theme) =>
    createStyles({
        labelRoot: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0.5, 0),
        },
        labelText: {
            fontWeight: 'inherit',
            flexGrow: 1,
        },
    }),
);

interface MoreMenuTreeItem_Props {
    menuItem: I_LinksConfiguration;
    nodeID: string;
    addNodeIDMap: (nodeID: string, menuItem: I_LinksConfiguration) => void;
}

const MorMenuTreeItem = (props: MoreMenuTreeItem_Props) => {
    useEffect(() => {
        props.addNodeIDMap(props.nodeID, props.menuItem);
    }, []);
    const { color } = props.menuItem;
    const classes = useTreeItemStyles({ color });
    const children = props.menuItem.subMenu ? (
        <>
            {props.menuItem.subMenu.map((e, index: number) => (
                <MorMenuTreeItem
                    key={`${props.nodeID}_${index}_${e.label}`}
                    menuItem={e}
                    nodeID={`${props.nodeID}_${index}_${e.label}`}
                    addNodeIDMap={props.addNodeIDMap}
                />
            ))}
        </>
    ) : null;
    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    <ListItemIcon>
                        {props.menuItem.icon !== undefined && <IconComponent icon={props.menuItem.icon} size="small" />}
                    </ListItemIcon>
                    <Typography variant="body2" className={classes.labelText}>
                        {props.menuItem.label}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {props.menuItem.info}
                    </Typography>
                </div>
            }
            nodeId={props.nodeID}
        >
            {children}
        </TreeItem>
    );
};

export interface MoreMenuTreeView_Props {
    menuList: I_LinksConfiguration[];
    setIsMenuOpen: any;
}

const MoreMenuTreeView = (props: MoreMenuTreeView_Props): JSX.Element => {
    const history = useHistory();
    const nodeIDMap: { [key: string]: I_LinksConfiguration } = {};

    // eslint-disable-next-line @typescript-eslint/ban-types
    const handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string) => {
        const item = nodeIDMap[nodeIds];
        if (item.to) {
            props.setIsMenuOpen(false);
            history.push(item.to);
        }
    };

    const addNodeIDMap = (nodeID: string, menuItem: I_LinksConfiguration): void => {
        nodeIDMap[nodeID] = menuItem;
    };
    return (
        <TreeView
            // defaultExpanded={['3']}
            defaultExpanded={Object.keys(nodeIDMap)}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
            onNodeSelect={handleSelect}
        >
            {props.menuList.map((e, index: number) => (
                <MorMenuTreeItem
                    key={`TreeView_${index}_${e.label}`}
                    menuItem={e}
                    nodeID={`TreeView_${index}_${e.label}`}
                    addNodeIDMap={addNodeIDMap}
                />
            ))}
        </TreeView>
    );
};

export default MoreMenuTreeView;
