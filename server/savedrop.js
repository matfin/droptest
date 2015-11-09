'use strict';

Meteor.methods({
	
	'droptransfer': (files) => {
		return new Promise((resolve, reject) => {

			let count 		= Object.keys(files).length,
					index 		= 0;

			let processFunc = (() => {

				console.log(index, count);

				if(index === count) {
					console.log('Ok exit now!');
					resolve({done: true});
				}
				else {
					saveDrop(files[index]).then(() => {
						index++;
						console.log(`Processing at index ${index}`);
						processFunc();
					});
				}
			});

			processFunc();

		});
	}
});

let saveDrop = (file) => {
	return new Promise((resolve, reject) => {
		Meteor.setTimeout(resolve, 1500);
	});
}