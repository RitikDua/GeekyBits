const fs = require('fs')
const path = require('path')
const execute = require('../middlewares/CompileCode')
const {c, cpp, python, java} = require('compile-run');
const deleteFile = (filename) => {
    fs.unlink(filename, function (err) {
        if (err) {
            console.log("SORRY NOT DELETED")
        };
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    }); 
}
exports.codeCompile=async (request,response)=>{
    try{
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
    }
    catch (err){
        response.status(500).json({err});
    }
}
exports.compileCode=async (request,response)=>{
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

}