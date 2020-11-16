require('dotenv').config();
const mongoose=require('mongoose');
process.on('uncaughtException',error=>{
    // console.log(error);
    console.log(`UNCAUGHT_EXCEPTION...\n${error.name}:${error.message}\nShutting down the app`);
    process.exit(1);
});
const app=require(`${__dirname}/app`);
const url= process.env.DB_CLOUD;
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true }).then(() => console.log('Successfully Connected to Cloud'));
const port=process.env.PORT||4000;
const server=app.listen(port,()=>{console.log(`Server running on port:${process.env.PORT}`)});

process.on('unhandledRejection',err=>{
    console.log(`UNHANDLED REJECTION ...\n${err.name} : ${err.message}\nShutting down the app`);    
    server.close(()=>{
        process.exit(1);
    });
});
//For SIGTERM signal which heroku gives to site every 24 hrs to keep it in a good state..b
// has a bad impact sometimes request are unhandled and they just keep hanged ...so we need to shut down the server gracefully
process.on('SIGTERM',()=>{
    console.log('SIGTERM SIGNAL!!! Shutting down gracefully');
    server.close(()=>{
        console.log('Webapp processes terminated');
    }); 
});
