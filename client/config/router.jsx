import React from 'react';
import { Route } from 'react-router-dom';
import TopicList from 'VIEW/TopicList';
import TopicDetail from 'VIEW/TopicDetail';
import TestApi from 'VIEW/test/api-test';

const Routes = () => [
	<Route path="/" exact component={TopicList} />,
	<Route path="/detail" component={TopicDetail} />,
	<Route path="/test" component={TestApi} />
];

export default Routes;
