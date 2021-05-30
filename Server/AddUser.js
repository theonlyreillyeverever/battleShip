

module.exports = {
     justPrint(req, res, next){
        console.log("this bitch")
        next();
    }
}