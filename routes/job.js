/**
 * API to send Job Information
 */

var _ = require('underscore');

/**
 * JSON API for listing all Jobs
 */
exports.list = function(db){
    return function(req, res){
        var jobCollection = db.get('JobCollection');
        jobCollection.find({}, {}, function(error, jobs){
            jobs = _.sortBy(jobs, 'started');
            jobs.reverse();
            res.json(jobs);
        });
    };
};

/**
 * JSON API for getting a single Job
 */
exports.get = function(db){
    return function(req, res){
        var jobCollection = db.get('JobCollection');
        jobCollection.findById(req.params.id, {}, function(error, job){
            res.json(job);
        });
    };
};

/**
 * 
 */
exports.logs = function(req, res){
    var loggly = require('loggly');
    var nconf = require('nconf');
    var logger = loggly.createClient(nconf.get('loggly'));
    logger.search({query: 'json.jobInfo.jobId:"'+req.params.jobId+'"'}).run(function(err, results){
        res.json(results.events);
    });
};