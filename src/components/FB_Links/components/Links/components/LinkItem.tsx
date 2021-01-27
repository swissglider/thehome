import React from 'react';
import { Icon, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getMainComponentsConfigurationByLabel } from '../../../../../configuration/MainComponents';

const LinkItem = (props: { link: any }): JSX.Element => {
    const hL = getMainComponentsConfigurationByLabel('Links').to;
    return (
        <ListItem button component="a" href={props.link.link}>
            <ListItemText
                primary={props.link.name}
                secondary={props.link.description !== undefined ? props.link.description : ''}
            />
            <ListItemSecondaryAction>
                <Icon component={Link} to={`${hL}/editLink/${props.link.id}`}>
                    edit
                </Icon>
                <Icon component={Link} to={`${hL}/deleteLink/${props.link.id}`}>
                    delete
                </Icon>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default LinkItem;
