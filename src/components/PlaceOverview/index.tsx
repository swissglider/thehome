import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import HomeSelect from './components/HomeSelect';

const PlaceOverview = (): JSX.Element => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path} component={HomeSelect} />
            {/* <Route exact path={`${path}/singlepost/:postId`} component={SinglePostPage} />
            <Route exact path={`${path}/editPost/:postId`} component={EditPostForm} />
            <Route exact path={`${path}/addPost`} component={AddPostForm} /> */}
        </Switch>
    );
};

export default PlaceOverview;
