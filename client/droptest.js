'use strict';

Template.droptest.created = function() {
	console.log(`template:droptest was created`);
};

Template.droptest.rendered = function() {
	console.log(`template:droptest was rendered`);
};

Template.droptest.destroyed = function() {
	console.log(`template:droptest was destroyed`);
};

Template.droptest.helpers({});

Template.droptest.events({
	'drop #droptest': (e, template) => {
		e.stopPropagation();
		
		let originalEvent 	= e.originalEvent,
				dataTransfer 		= originalEvent.dataTransfer,
				files 					= dataTransfer.files;

		Meteor.call('droptransfer', files, (err, res) => {
			console.log(`We got error: ${err} and result: ${res}`);
		});

		console.log(files.length);


		return false;
	}
});

