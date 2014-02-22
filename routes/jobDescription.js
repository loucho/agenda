/**
 * API to send and receive Job Descriptions
 */

/**
 * JSON API for listing all Job Descriptions
 */
exports.list = function(db){
    return function(req, res){
        var jobDescriptionCollection = db.get('JobDescriptionCollection');
        jobDescriptionCollection.find({}, {}, function(error, jobDescriptions){
            res.json(jobDescriptions);
        });
    };
};

/**
 * JSON API for getting a single Job Description
 */
exports.get = function(db){
    return function(req, res){
        var jobDescriptionCollection = db.get('JobDescriptionCollection');
        jobDescriptionCollection.findById(req.params.id, {}, function(error, jobDescription){
            res.json(jobDescription);
        });
    };
};

/**
 * JSON API for creating a new Job Description
 */
exports.create = function(db){
    return function(req, res){
        var shakengo = require('shakengo');
        var collection = db.get('JobDescriptionCollection');
        var jd = new shakengo.JobDescription();
        jd.populate(req.body);
        prepareJobDescription(jd, function(jobDescription){
            if(jobDescription._id){
                collection.updateById(jobDescription._id, jobDescription, function(err, doc){
                    if(err)
                        throw 'Error';
                    else{
                        createCron(jobDescription);
                        res.json(doc);
                    }
                });
            } else{
                jobDescription.created = new Date();
                collection.insert(jobDescription, {}, function(err, doc){
                    if(err)
                        throw 'Error';
                    else{
                        createCron(jobDescription);
                        res.json(doc);
                    }
                });
            }
        });
    };
};

/**
 * Prepares the Job Description with the default input and output callbacks
 */
function prepareJobDescription(jobDescription, cb){
    var async = require('async');
    var fs = require('fs');
    var nconf = require('nconf');
    jobDescription.components.sort(compare);
    async.each(jobDescription.components, function(component, callback){
        fs.readFile(nconf.get('jobDescriptions:defaultInputCallback'), 'utf8', function(error, data){
            if(error){
                callback('Fallo la lectura del archivo input');
            } else{
                component.inputCallback = data;
                fs.readFile(nconf.get('jobDescriptions:defaultOutputCallback'), 'utf8', function(error, data){
                    if(error){
                        callback('Fallo la lectura del archivo output');
                    } else{
                        component.outputCallback = data;
                        callback();
                    }
                });
            }
        });

    }, function(error){
        if(error)
            console.log('Algo horrible sucedio D= -- ' + error);
        else{
            fs.readFile(nconf.get('jobDescriptions:finalOutputCallback'), 'utf8', function(error, data){
                if(error){
                    console.log('Fallo la lectura del archivo output final');
                } else{
                    jobDescription.components[jobDescription.components.length - 1].outputCallback = data;
                    cb(jobDescription);
                }
            });

        }
    });

}

/**
 * Creates the Cron
 */
function createCron(jobDescription){
    var crontab = require('crontab');
    var nconf = require('nconf');
    crontab.load(function(err, tab){
        if(err){
            console.log(err);
            process.exit(1);
        }

        var command = 'curl http://localhost:' + nconf.get('server:port') + '/schedule/' + jobDescription._id;
        tab.remove(tab.findCommand(command));

        tab.create(command, "created automatically", jobDescription.schedule);
        tab.save(function(err, tab){
            if(err){
                console.log(err);
                process.exit(1);
            }
        });
    });
}

/**
 * Function to sort the components
 * 
 * @param a
 * @param b
 * @returns {Number}
 */
function compare(a, b){
    if(a.type < b.type)
        return -1;
    if(a.type > b.type)
        return 1;
    return 0;
}