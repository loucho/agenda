/*
 * GET home page.
 */

var nconf = require('nconf');

exports.app = function(oa){
    return function(req, res){

        if(!req.session.oauth_token){

            var path = '/';
            res.redirect(path);

            // If auth_token is stored in a session cookie goes to the main page
            // and prints some user data (getting it also from the session
            // cookie)
        } else{

            var user = JSON.parse(req.session.user);
            res.render('index', {
                title: 'Shake N Go',
                user: user.displayName,
                email: user.email
            });
        }

    };
};

/**
 * 
 */
exports.welcome = function(req, res){
    res.render('login');
};

/**
 * 
 */
exports.auth = function(oa){
    return function(req, res){
        if(!req.session.oauth_token){

            var path = oa.getAuthorizeUrl();
            res.redirect(path);

            // If auth_token is stored in a session cookie goes to the main page
            // and prints some user data (getting it also from the session
            // cookie)
        } else{

            res.redirect('/app');
        }
    };
};

/**
 * 
 */
exports.login = function(oa){
    return function(req, res){

        // Using the access code goes again to the IDM to obtain the
        // access_token
        oa.getOAuthAccessToken(req.query.code, function(e, results){

            // Stores the access_token in a session cookie
            req.session.oauth_token = results.access_token;

            var url = nconf.get('oAuth:idmURL') + '/user/';

            // Using the access token asks the IDM for the user info
            oa.get(url, results.access_token, function(e, response){

                // Stores the user info in a session cookie and redirects to the
                // main page
                req.session.user = response;
                res.redirect('/app');
            });
        });
    };
};

/**
 * 
 */
exports.logout = function(req, res){
    req.session.oauth_token = undefined;
    res.redirect('/');
};