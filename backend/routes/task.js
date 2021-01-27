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
    Task.find(function (err, Task) {
        if (err) return console.error(err);
        return res.status(200).json({
            success: true,
            msg: "Listed",
            tasklist: Task
        });
    });
});

module.exports = router;