const fs = require('fs')
const path = require('path')
const execute = require('../middlewares/CompileCode')
const {c, cpp, python, java} = require('compile-run');
const axios=require('axios');
const catchAsyncError=require(`${__dirname}/../utils/catchAsyncError`);
const AppError = require(`${__dirname}/../utils/AppError`);
const deleteFile = (filename) => {
    fs.unlink(filename, function (err) {
        if (err) {
            console.log("SORRY NOT DELETED")
        };
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    }); 
}
exports.compileOnline=catchAsyncError(async (request,response,next)=>{    
    const {code,input,lang}=request.body;
    let langCode,langIndex;
    switch(lang.toLowerCase()){
        case 'c':langCode='c';langIndex='3';break;
        case 'java':langCode='java';langIndex='3';break;
        case 'c++':langCode='cpp';langIndex='4';break;
        case 'python':langCode='python3';langIndex='3';break;
    }
    const {data}=await axios({method:'POST',url:'https://api.jdoodle.com/v1/execute',data:{
        script:code,
        language:langCode,
        versionIndex:langIndex,
        stdin:decodeURIComponent(input),
        clientId:process.env.JDOODLE_CLIENT_KEY,
        clientSecret:process.env.JDOODLE_SECRET_KEY
      }});
      console.log(data);
    response.status(200).json({
        output:data.output?data.output:(data.error?data.error:`Error occured with exit code ${data.statusCode}`)
    });
});
exports.codeCompile=catchAsyncError(async (request,response,next)=>{    
    const {code,input,lang}=request.body;
    let testEnv;
    switch (lang.toLowerCase()) {
        case 'c':testEnv=c;break;
        case 'c++':testEnv=cpp;break;
        case 'java':testEnv=java;break;
        case 'python':testEnv=python;break;
    }
    const data=await testEnv.runSource(code,{stdin:input});
    response.status(200).json({
        output:data.stdout?data.stdout:(data.stderr?data.stderr:`Error: ${data.signal} with exit code ${data.exitCode}`)
    });
});
exports.compileCode=catchAsyncError(async (request,response,next)=>{
    console.log(request.body)
    const code = request.body.code
    const input = request.body.input
    const lang = request.body.lang

	 return execute.executeCode(code, input)
                    .then(data=>{
                        console.log("SUCCESSFULL PROMISE " + data)
                        console.log("SENDING " + data)
                        response.json(data)
                        deleteFile(path.join(__dirname, '../input.txt'))
                        deleteFile(path.join(__dirname, '../test.c'))
                        deleteFile(path.join(__dirname, '../a.exe'))

                    })
                    .catch(err => {
                        console.log("ERROR PROMISE " + err)
                        deleteFile(path.join(__dirname, '../input.txt'))
                        deleteFile(path.join(__dirname, '../test.c'))
                        deleteFile(path.join(__dirname, '../a.exe'))
            })

});