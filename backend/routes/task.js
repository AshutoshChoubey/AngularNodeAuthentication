const express = require('express');
const router = express.Router();
const Task = require('../models/Task');


router.post('/add', (req, res) => {
    // invalid token - synchronous
    // try {
    //     var decoded = jwt.verify(token, 'wrong-secret');
    //   } catch(err) {
    //     // err
    //   }

    let {
        title,
        type,
        descripition,
    } = req.body;
    let tasklist = req.body.itemRows;

    let newTask = new Task({
        title,
        type,
        descripition,
        tasklist,
    });

    newTask.save().then(task => {
        return res.status(201).json({
            success: true,
            msg: "Hurry! Task is now registered Successfully.",
            addedTask: task
        });
    });

});
router.get('/view', (req, res) => {
    // const myCustomLabels = {
    //     totalDocs: 'itemCount',
    //     docs: 'itemsList',
    //     limit: 'perPage',
    //     page: 'currentPage',
    //     nextPage: 'next',
    //     prevPage: 'prev',
    //     totalPages: 'pageCount',
    //     pagingCounter: 'slNo',
    //     meta: 'paginator',
    //   };
      
    //   const options = {
    //     page: 1,
    //     limit: 10,
    //     customLabels: myCustomLabels,
    //   };
      
if (req.query.colSort=='undefined')
{
    req.query.colSort='title'
}
    const options = {
        offset: req.query.offset,
        limit: req.query.limit,
        sort: {[req.query.colSort]:req.query.order_by}
    };
console.log(options);
    Task.paginate({}, options, function (err, result) {
        if (err) return console.error(err);
        return res.status(200).json({
            success: true,
            msg: "Listed",
            tasklist: result
        });
    });

});

module.exports = router;