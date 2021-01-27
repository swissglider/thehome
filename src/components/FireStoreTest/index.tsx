import React, { useContext, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Home from './components/Home';
import { FrameworkContext } from '../../utils/FrameworkContext';

const FireStoreTest = (): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { path, url } = useRouteMatch();
    const [context, setContext] = useContext(FrameworkContext);
    useEffect(() => {
        const context_ = { ...context };
        context_.title = 'FireTest';
        context_.subNavButtons = [];
        context_.component = <div>Posts</div>;
        setContext(context_);
    }, []);
    return (
        <Switch>
            <Route exact path={path} component={Home} />
            {/* <Route exact path={`${path}/singlepost/:postId`} component={SinglePostPage} />
            <Route exact path={`${path}/editPost/:postId`} component={EditPostForm} />
            <Route exact path={`${path}/addPost`} component={AddPostForm} /> */}
        </Switch>
    );
};

export default FireStoreTest;
