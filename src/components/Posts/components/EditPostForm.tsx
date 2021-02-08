import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getMainComponentsConfigurationByLabel } from '../../../configuration/MainComponents';

import { I_Post, postUpdated } from '../../../redux/features/posts/postsSlice';
import { RootState } from '../../../redux/Store';

export const EditPostForm = (): JSX.Element => {
    const { postId } = useParams<Record<string, string | undefined>>();
    const hL = getMainComponentsConfigurationByLabel('Posts').to;

    const post: I_Post | undefined = useSelector((state: RootState) => state.posts.find((post) => post.id === postId));
    if (post === undefined) {
        return <div>ERROR</div>;
    }

    const [title, setTitle] = useState<string>(post.title);
    const [content, setContent] = useState<string>(post.content);

    const dispatch = useDispatch();
    const history = useHistory();

    const onTitleChanged = (e: any) => setTitle(e.target.value);
    const onContentChanged = (e: any) => setContent(e.target.value);

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({ id: postId, title, content }));
            history.push(`${hL}#${postId}`);
        }
    };

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    placeholder="What's on your mind?"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postContent">Content:</label>
                <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
            </form>
            <button type="button" onClick={onSavePostClicked}>
                Save Post
            </button>
        </section>
    );
};
