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
exports.codeCompile = catchAsyncError(async (request, response, next) => {
    const { code, input, lang } = request.body;
    let testEnv,options={stdin:input};
    console.log(code, input, lang);
    switch (lang.toLowerCase()) {
        case "c":testEnv = c;break;
        case "cpp":testEnv = cpp;break;
        case "java":testEnv = java;break;
        case "python":{testEnv = python;options.executionPath='python3';};break;
    }    
    const data = await testEnv.runSource(decodeURIComponent(code),options);        
    response.status(200).json({
        output: data.stderr||data.signal||data.errorType ?`${data.errorType}\n${data.stderr}\nError: ${data.signal} with exit code ${data.exitCode}`:data.stdout
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