var db = require('../db/config');
var todo = {};



todo.getAll = function(req, res, next){
    db.manyOrNone("SELECT * FROM todo")
    .then(function(result){
        res.locals.todo = result;
        next();
    })

}

todo.getById = function(req, res, next){
    db.oneOrNone("SELECT * FROM todo is = $1", [req.params.id])
    .then (function(result){
        res.locals.todo = result;
        next();
    })
}

todo.delete = function(req,res, next){
    db.none("DELETE FROM todo ")

    
}

todo.create = function(req, res, next){
    db.one("insert INTO todo (subject, content VALUES ($1, $2")
    .then(function(result){
        res.locals.todo_id = result
    })
}

todo.update = function(req, res, next){
    db.one(`UPDATE todo SET subject = $1, content = $2 WHERE id = $3 returning id;`, [req.body.subject, req.body.content, req.params.id])
}



module.exports = todo;