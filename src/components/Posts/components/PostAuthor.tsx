import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../redux/Store';

export const PostAuthor = (props: { userId: string }): JSX.Element => {
    const author = useSelector(
        (state: RootState) => state.users.find((user) => user.id === props.userId),
        shallowEqual,
    );

    return <span>by {author ? author.name : 'Unknown author'}</span>;
};
