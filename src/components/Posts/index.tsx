import React, { useContext, useEffect } from 'react';
import { PostsList } from './components/PostsList';
import { AddPostForm } from './components/AddPostForm';
import { EditPostForm } from './components/EditPostForm';
import { SinglePostPage } from './components/SinglePostPage';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { FrameworkContext } from '../../utils/FrameworkContext';

const Posts = (): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { path, url } = useRouteMatch();
    const [context, setContext] = useContext(FrameworkContext);

    useEffect(() => {
        const context_ = { ...context };
        context_.title = 'Posts';
        context_.subNavButtons = [
            { title: 'Posts', to: path, icon: 'mail_outline' },
            { title: 'Add Post', to: `${path}/addPost`, icon: 'post_add' },
        ];
        context_.rightComponent = <div>Posts</div>;
        setContext(context_);
    }, []);
    return (
        <Switch>
            <Route exact path={path} component={PostsList} />
            <Route exact path={`${path}/singlepost/:postId`} component={SinglePostPage} />
            <Route exact path={`${path}/editPost/:postId`} component={EditPostForm} />
            <Route exact path={`${path}/addPost`} component={AddPostForm} />
        </Switch>
    );
};

// const Posts = PostsList;
export default Posts;
