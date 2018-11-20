import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TopicList from '../views/TopicList';
import TopicDetail from '../views/TopicDetail';
import TestApi from '../views/test/api-test';

const Routes = () => [
	<Route path="/" render={() => <Redirect to="/list" />} exact="true" />,
	<Route path="/list" component={TopicList} />,
	<Route path="/detail" component={TopicDetail} />,
	<Route path="/test" component={TestApi} />
];

export default Routes;
