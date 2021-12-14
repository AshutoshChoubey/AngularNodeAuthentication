const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const key = process.env.JWT_KEY;

router.use(async (req, res, next) => { 

    let token;
    //console.log(req.headers.authorization);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) {
        return res.status(401).json({
            success: false,
            msg: "Sorry Token not found. you are not authorized"
        });
     }
     jwt.verify(token, key, function (err, decoded){
        if (err){
            console.log(decoded);
            return res.status(401).json({
                success: false,
                msg: "Sorry Token Expired"
            });
        } else {
            next();
        }
    });
//next();
      
} )
router.post('/add', (req, res) => {
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
router.post('/update', (req, res) => {
  //  console.log(req);

  

    
 if(req.body.editdata.selectedListId.length==1)
 {
    let {
        title,
        type,
        descripition,
    } = req.body.formData;
    let tasklist = req.body.formData.itemRows;
    // let updateTask = new Task({
    //     _id:req.body.editdata.selectedListId[0],
    //     title,
    //     type,
    //     descripition,
    //     tasklist,
    // });
    Task.updateOne({_id: req.body.editdata.selectedListId[0]}, { title,type,
        descripition,tasklist}, function(task) {
            return res.status(201).json({
                success: true,
                msg: "Hurry! Task is now Updated Successfully.",
                addedTask: task
            });
        
      });

    // updateTask.save().then(task => {
    //     return res.status(201).json({
    //         success: true,
    //         msg: "Hurry! Task is now Updated Successfully.",
    //         addedTask: task
    //     });
    // }); 
 }
 if(req.body.editdata.selectedListId.length>1)
 {
    let {
        type,
        descripition,
    } = req.body.formData;
     for(let i=0;i<req.body.editdata.selectedListId.length;i++)
     {
        let updateTask = new Task({
            _id:req.body.editdata.selectedListId[i],
            type,
            descripition,
        });
        // updateTask.save().then(task => {
        //     return res.status(201).json({
        //         success: true,
        //         msg: "Hurry! Task is now Updated Successfully.",
        //         addedTask: task
        //     });
        // }); 
        Task.updateOne({_id: req.body.editdata.selectedListId[i]}, { type,
            descripition}, function(task) {
                 
            
          });
     }
     return res.status(201).json({
        success: true,
        msg: "Hurry! Task is now Updated Successfully.",
    });
    
 }

    // invalid token - synchronous
    // try {
    //     var decoded = jwt.verify(token, 'wrong-secret');
    //   } catch(err) {
    //     // err
    //   }

    // let {
    //     title,
    //     type,
    //     descripition,
    // } = req.body;
    // let tasklist = req.body.itemRows;

    // let newTask = new Task({
    //     title,
    //     type,
    //     descripition,
    //     tasklist,
    // });

    // newTask.save().then(task => {
    //     return res.status(201).json({
    //         success: true,
    //         msg: "Hurry! Task is now registered Successfully.",
    //         addedTask: task
    //     });
    // });

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

    if (req.query.colSort == 'undefined') {
        req.query.colSort = 'title'
    }
    const options = {
        offset: req.query.offset,
        limit: req.query.limit,
        sort: { [req.query.colSort]: req.query.order_by }
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
router.post('/delete', (req, res) => {

    Task.deleteMany({_id: { $in: req.body}}, function(err,result) {
        if (err) return console.error(err);
        return res.status(200).json({
            success: true,
            msg: "Deleted Sussessfully",
            tasklist: result
        });
    })

});



module.exports = router;
