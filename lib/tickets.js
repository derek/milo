module.exports = function () {
	var yql = require('yql').exec,
		config = require('milo/utils').getConfig(),
		flags = this.flags,
		url = 'http://yuilibrary.com/projects/yui3/query?col[]=id&col[]=type&col[]=priority&col[]=owner&col[]=milestone&col[]=status&col[]=summary&col[]=estimated&col[]=completed&col[]=remaining&col[]=sprint';

	url += '&owner=' + config.yuilibrary.user;

	if (flags.milestone) {
		url += '&sprint=' + flags.milestone;
		if (flags.sprint) {
			url += '%3A%3Asprint+' + flags.sprint;
		}
	}
	
	if (flags.component) {
		url += '&component=' + flags.component;
	}

	yql('select * from html where url=@url and xpath=@xpath', function (response) {

		var results = response.query.results,
			rows, tickets = [];

		if (!results) {
			console.log("No results found");
			return;
		}

		rows = response.query.results.tr;

		// If the result is only 1, it's an object, so turn it into an array.
		if (!rows.length) {
			rows = [rows];
		}

		rows.forEach(function (row) {
			var ticket = {};
			
			row.td.forEach(function (field) {
				ticket[field.name] = (field.a && field.a.content) || (field.p);
			});

			tickets.push(ticket);
		});

		console.log(tickets);

	}, {
		url: url,
		xpath: '//table[@class="listing tickets"]/tbody/tr'
	});
};