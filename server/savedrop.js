'use strict';

Meteor.methods({
	
	'droptransfer': (files) => {

		return new Promise((resolve, reject) => {

			let count 		= files.length,
					index 		= 0;

			let processFunc = (() => {

				if(index === count) {
					console.log('Ok exit now!');
					resolve({done: true});
				}
				else {
					saveDrop(files[index]).then(() => {
						index++;
						console.log(`Processing at index ${index}`);
						processFunc();
					}).catch((err) => {
						reject({
							done: false,
							error: err
						});
					});
				}
			});

			processFunc();

		});
	}
});

let saveDrop = (file) => {
	return new Promise((resolve, reject) => {
		let fs = Npm.require('fs'),
			filename = `./${file.lastModified}_${file.name}`;

		fs.writeFile(filename, file.data, 'base64', (err) => {
			if(err) {
				console.log(`Rejecting with ${err}`);
				reject({
					status: 'error', 
					error: err
				});
			}
			else {
				console.log(`Resolving with ${filename}`);
				resolve({
					status: 'ok',
					message: `File with filename ${filename} was saved ok.`
				});
			}
		});	
	});
}