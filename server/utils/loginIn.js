const router = require('express').Router();
const axios = require('axios');

const baseUrl = 'https://cnodejs.org/api/v1';

router.post('/login', (req, res) => {
	axios.post(`${baseUrl}/accesstoken`, {

	}).then(resp => {
		if(resp.status == 200 && resp.data.success) {
			req.session.user = {
				accessToken: req.body.accessToken
			}
		}
	});
});
