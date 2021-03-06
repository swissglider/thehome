import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PlaceOverviewContainer from './components/PlaceOverviewContainer';

const PlaceOverview = (): JSX.Element => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={path} component={PlaceOverviewContainer} />
            {/* <Route exact path={`${path}/singlepost/:postId`} component={SinglePostPage} />
            <Route exact path={`${path}/editPost/:postId`} component={EditPostForm} />
            <Route exact path={`${path}/addPost`} component={AddPostForm} /> */}
        </Switch>
    );
};

export default PlaceOverview;
