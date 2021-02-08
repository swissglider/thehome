import React, { useEffect, useRef } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { I_Post, selectPosts } from '../../../redux/features/posts/postsSlice';
import { Link, useHistory } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    createStyles,
    IconButton,
    makeStyles,
    Theme,
    Tooltip,
    Typography,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { getMainComponentsConfigurationByLabel } from '../../../configuration/MainComponents';

interface I_PostMenuItem extends I_Post {
    ref: React.RefObject<HTMLDivElement>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStylesPostsList = makeStyles((theme: Theme) =>
    createStyles({
        paperContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1),
                width: '100%',
                // width: theme.spacing(16),
                // height: theme.spacing(16),
            },
        },
        paper: {
            flexGrow: 1,
            padding: 5,
        },
    }),
);

export const PostsList = (): JSX.Element => {
    const classes = useStylesPostsList();
    const posts: I_Post[] = useSelector(selectPosts, shallowEqual);
    const extPosts: I_PostMenuItem[] = posts.map(
        (post: I_Post): I_PostMenuItem => {
            const ref = useRef<HTMLDivElement>(null);
            return { ...post, ...{ ref: ref } };
        },
    );
    const orderedPosts = extPosts.slice().sort((a, b) => b.date.localeCompare(a.date));
    const hL = getMainComponentsConfigurationByLabel('Posts').to;

    const hash = useHistory().location.hash;

    useEffect(() => {
        if (hash.startsWith('#')) {
            const anchorTarget = document.getElementById(hash.substring(1));
            if (anchorTarget) anchorTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);

    const renderedPosts = orderedPosts.map((post: I_PostMenuItem) => (
        <div ref={post.ref} key={post.id} id={post.id}>
            <Card elevation={3}>
                <CardHeader title={post.title} />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {post.content.substring(0, 100)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <PostAuthor userId={post.user} />
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <TimeAgo timestamp={post.date} />
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Tooltip title="View Post">
                        <IconButton component={Link} to={`${hL}/singlepost/${post.id}`}>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Post">
                        <IconButton component={Link} to={`${hL}/editPost/${post.id}`}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <ReactionButtons post={post} />
                </CardActions>
            </Card>
        </div>
    ));

    return <div className={classes.paperContainer}>{renderedPosts}</div>;
};
