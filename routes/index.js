/*
 * GET home page.
 */

exports.app = function(req, res){

    res.render('index', {
        title: 'Agenda'
    });

};

exports.welcome = function () {
    res.render('index', {
        title: 'Agenda'
    });
}