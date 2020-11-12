const express = require('express');
const app = express();
const cors=require('cors');
const morgan = require('morgan');
const tutFile=require(`${__dirname}/dev-data/tutorials.json`);
//Adding middlewares
if(process.env.NODE_ENV === 'DEVELOPMENT')
    app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
//mounting api endpoints
app.route('/')
.get((request, response) => {
    response.status(200).json({
        status: 'success',
        message: 'Server is running'
    });
});
app.route('/tutorials')
.get((request, response) => {
    response.status(200).json(tutFile);
});
app.route('/tutorials/:tutId')
.get((request, response) => {
    const object=tutFile.find(obj=>{
        return obj._id===parseInt(request.params.tutId);
    });
    response.status(200).json(object);
});
module.exports =app;