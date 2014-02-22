/**
 * API to send and receive Components
 */

/**
 * JSON API for listing all Components
 */
exports.list = function(db){
    return function(req, res){
        var componentCollection = db.get('ComponentCollection');
        componentCollection.find({}, {}, function(error, components){
            res.json(components);
        });
    };
};

/**
 * JSON API for getting a single Component
 */
exports.get = function(db){
    return function(req, res){
        var componentCollection = db.get('ComponentCollection');
        componentCollection.findById(req.params.id, {}, function(error, component){
            res.json(component);
        });
    };
};

/**
 * JSON API for creating a new Component
 */
exports.create = function(db){
    return function(req, res){
        var shakengo = require('shakengo');
        var collection = db.get('ComponentCollection');
        var component = new shakengo.Component();
        component.populate(req.body);
        console.log(req.body);
        console.log(JSON.stringify(component));
        if(component._id){
            collection.updateById(component._id, component, function(err, doc){
                if(err)
                    throw 'Error';
                else
                    res.json(doc);
            });
        } else{
            component.created = new Date();
            collection.insert(component, {}, function(err, doc){
                if(err)
                    throw 'Error';
                else
                    res.json(doc);
            });
        }
    };
};
