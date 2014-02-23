/**
 * API to send and receive Persons
 */

/**
 * JSON API for listing all Persons
 */
exports.list = function(db){
    return function(req, res){
        var personCollection = db.get('PersonCollection');
        personCollection.find({}, {}, function(error, persons){
            res.json(persons);
        });
    };
};

/**
 * JSON API for getting a single Person
 */
exports.get = function(db){
    return function(req, res){
        var personCollection = db.get('PersonCollection');
        personCollection.findById(req.params.id, {}, function(error, person){
            res.json(person);
        });
    };
};

/**
 * JSON API for creating a new Person
 */
exports.create = function(db){
    return function(req, res){
        var agenda = require('agenda');
        var collection = db.get('PersonCollection');
        var person = new agenda.Person();
        person.populate(req.body);
        console.log(req.body);
        console.log(JSON.stringify(person));
        if(person._id){
            collection.updateById(person._id, person, function(err, doc){
                if(err)
                    throw 'Error';
                else
                    res.json(doc);
            });
        } else{
            person.created = new Date();
            collection.insert(person, {}, function(err, doc){
                if(err)
                    throw 'Error';
                else
                    res.json(doc);
            });
        }
    };
};
