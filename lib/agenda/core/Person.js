/**
 * The Person Object
 */
function Person(){
    this.name = "";
    this.last_name = "";
    this.second_last_name = "";
    this.emails = [];
    this.phones = [];
    this.created = "";
}

Person.prototype.populate = function(obj){
    this.name = (obj.name) ? obj.name : "";
    this.last_name = (obj.last_name) ? obj.last_name : "";
    this.second_last_name = (obj.second_last_name) ? obj.second_last_name : "";
    this.emails = (obj.emails) ? obj.emails : [];
    this.phones = (obj.phones) ? obj.phones : [];
    this.created = (obj.created) ? obj.created : "";
    if(obj._id)
        this._id = obj._id;
};

module.exports = Person;