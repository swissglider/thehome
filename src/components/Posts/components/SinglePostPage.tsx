import React from 'react';
import { useSelector } from 'react-redux';
import { I_Post, selectPost } from '../../../redux/features/posts/postsSlice';
import { RootState } from '../../../redux/Store';
import { Link, useParams } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { ReactionButtons } from './ReactionButtons';
import { getMainComponentsConfigurationByLabel } from '../../../configuration/MainComponents';

export const SinglePostPage = (): JSX.Element => {
    const { postId } = useParams<Record<string, string | undefined>>();
    const hL = getMainComponentsConfigurationByLabel('Posts').to;

    const post: I_Post | undefined = useSelector((state: RootState) => selectPost(state, postId));

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <p className="post-content">{post.content}</p>
                <p className="post-content">
                    <PostAuthor userId={post.user} />
                </p>
                <Link to={`${hL}/editPost/${post.id}`} className="button">
                    Edit Post
                </Link>
                <ReactionButtons post={post} />
            </article>
        </section>
    );
};
