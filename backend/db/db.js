const mongoose = require('mongoose')

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }, function (err) { //process.env.MONGODB_URI = 'mongodb://localhost/yourdb'
        if (err) {
            console.log(err);
        } else {
            console.log('mongoose connection is successful on: ' + process.env.MONGODB_URI);
        }
    })
}