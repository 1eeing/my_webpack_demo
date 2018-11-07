import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import TopicList from '../views/topicList';
import TopicDetail from '../views/topicDetail';

const Router = () => {
	<BrowserRouter>
		<Route path="/list" component={TopicList} />
		<Route path="/detail" component={TopicDetail} />
	</BrowserRouter>
};

export default Router;
