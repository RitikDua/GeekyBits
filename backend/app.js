const express = require('express');
const app = express();
const morgan = require('morgan');

//Adding middlewares
if(process.env.NODE_ENV === 'DEVELOPMENT')
    app.use(morgan('dev'));
app.use(express.json());
//mounting api endpoints
app.route('/')
.get((request, response) => {
    response.status(200).json({
        status: 'success',
        message: 'Server is running'
    });
});
module.exports =app;