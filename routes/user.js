/*
 * GET users listing.
 */

exports.list = function(db){
    return function(req, res){
        var collection = db.get('usercollection');
        collection.find({}, {}, function(e, docs){
            res.render('users', {
                "userlist": docs
            });
        });
    };
};

exports.newuser = function(req, res){
    res.render('newuser', {
        title: 'Add New User'
    });
};

exports.add = function(db){
    return function(req, res){

        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var userEmail = req.body.useremail;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "username": userName,
            "email": userEmail
        }, function(err, doc){
            if(err){
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            } else{
                // If it worked, set the header so the address bar doesn't still
                // say /adduser
                res.location("users");
                // And forward to success page
                res.redirect("users");
            }
        });

    };
};

exports.test = function(req, res){
    var mandrill = require('mandrill-api/mandrill');
    var mandrill_client = new mandrill.Mandrill('s4IqK29QdNXo5nhu4Uc22Q');
    var message = {
        "html": "<p>Example HTML content</p>",
        "text": "Example text content",
        "subject": "example subject",
        "from_email": "lramirez@pcsmexico.com",
        "from_name": "Loucho",
        "to": [{
                "email": "loucho.advanced@gmail.com",
                "name": "Loucho",
                "type": "to"
            }],
        "images": [{
                "type": "image/png",
                "name": "IMAGECID",
                "content": "ZXhhbXBsZSBmaWxl"
            }]
    };
    var async = false;
    mandrill_client.messages.send({"message": message, "async": async}, function(result) {
        console.log(result);
        /*
        [{
                "email": "recipient.email@example.com",
                "status": "sent",
                "reject_reason": "hard-bounce",
                "_id": "abc123abc123abc123abc123abc123"
            }]
        */
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
};