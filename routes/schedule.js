/**
 * Route the schedule and start job actions
 */

var shakengo = require('shakengo');


/**
 * Receives a JobDscription Id and starts a new Job for it
 */
exports.start = function(db){
	return function(req, res) {
		var scheduler = new shakengo.Scheduler(db);
		scheduler.startJob(req.params.id);
		res.send("ok");
	};
};

/**
 * Receives a Job and sends it for the next process
 */
exports.process = function(db){
	return function(req, res) {
		var scheduler = new shakengo.Scheduler(db);
		scheduler.processJob(req.body.job);
		res.send("ok");
	};
};