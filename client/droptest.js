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
				files 					= dataTransfer.files,
				indices 				= Object.keys(files),
				promises 				= [];

		indices.forEach((index) => {
			promises.push(new Promise((resolve, reject) => {

				let reader 	= new FileReader(),
						file 		= files[index];
						
				/**
				 *	File has loaded
				 */
				reader.onload = (e) => {
					resolve({index: index, result: e});
				};

				/**
				 *	File did not load
				 */
				reader.onerror = (err) => {
					reject({index: index, error: err});
				};

				/**
				 *	Start reading the file
				 */
				reader.readAsBinaryString(file);

				// Meteor.setTimeout(() => {
				// 	resolve({done: `At index yes: ${index}`});
				// }, 1000);
			}));
		});

		Promise.all(promises).then((result) => {
			console.log('Success: ', result);
		}).catch((error) => {	
			console.log(`Error encountered: ${error}`);
		});

		// console.log(files, Object.keys(files));

		// Meteor.call('droptransfer', files, (err, res) => {
		// 	console.log(`We got error: ${err} and result: ${res}`);
		// 	console.log(res);
		// });

		return false;
	}
});

