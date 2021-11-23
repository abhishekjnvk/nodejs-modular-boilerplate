//Handle All Errors
module.exports = function(app){

    //wait for all routes to be registered
    setTimeout(() => {

        //handle 500 errors
        app.use(function(err, req, res, next){
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error',
                error: err.message
            });
        });

        //handle 404 Erorrs
        app.all("*", function(req, res){
            res.status(404).send({
                status: 500,
                message: 'Internal Server Error',
                error: err.message
            });
        });

    }, 2000);

}
