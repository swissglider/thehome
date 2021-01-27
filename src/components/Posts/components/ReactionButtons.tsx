import React from 'react';
import { useDispatch } from 'react-redux';
import { I_Post, reactionAdded } from '../../../redux/features/posts/postsSlice';

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀',
};

export const ReactionButtons = (props: { post: I_Post }): JSX.Element => {
    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="muted-button reaction-button"
                onClick={() => dispatch(reactionAdded({ postId: props.post.id, reaction: name }))}
            >
                {emoji} {props.post.reactions[name]}
            </button>
        );
    });

    return <div>{reactionButtons}</div>;
};
