const express = require('express');
const bodyParser=require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config()
const port = process.env.PORT
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
require('./db/db')

const app = express()

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(cors());
app.use('/api/users',userRouter);
app.use('/api/task',taskRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
