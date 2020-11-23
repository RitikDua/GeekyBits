const fs = require('fs')
const path = require('path')
const execute = require('../middlewares/CompileCode')
console.log(execute);
const deleteFile = (filename) => {
    fs.unlink(filename, function (err) {
        if (err) {
            console.log("SORRY NOT DELETED")
        };
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    }); 
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
                        deleteFile(path.join(__dirname, '../a.out'))

                    })
                    .catch(err => {
                        console.log("ERROR PROMISE " + err)
                        deleteFile(path.join(__dirname, '../input.txt'))
                        deleteFile(path.join(__dirname, '../test.c'))
                        deleteFile(path.join(__dirname, '../a.out'))
            })

}