import React from 'react';
import { Route } from 'react-router-dom';
import TopicList from 'VIEW/TopicList';
import TopicDetail from 'VIEW/TopicDetail';

const Routes = () => [
	<Route path="/" exact component={TopicList} />,
	<Route path="/detail" component={TopicDetail} />
];

export default Routes;
