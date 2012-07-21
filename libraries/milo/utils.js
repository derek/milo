function getGister (config) {
	var Gister = require('gister');
	
	return new Gister({
		token: config.github.token
	});
}

module.exports = {
	getGister: getGister
}