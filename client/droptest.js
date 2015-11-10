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
					file.data = e.target.result;
					resolve(file);
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

			}));
		});

		Promise.all(promises).then((processed_files) => {
			console.log(processed_files, ' is what we have here!');

			processed_files = processed_files.map((file) => { 
				return {
					lastModified: file.lastModified,
					name: file.name,
					size: file.size,
					type: file.type,
					data: file.data
				};
			});

			Meteor.call('droptransfer', processed_files, (err, res) => {
				console.log(err, res);
			});

		}).catch((err) => {	
			console.log(`Error encountered: ${err}`);
		});

		return false;
	}
});

