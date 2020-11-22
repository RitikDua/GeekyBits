const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process');


//saveTheFile
const saveFile = (name, data) => {
    return new Promise((resolve, reject) => {
      // Saving File
        console.log("SAVING FILES")
        fs.writeFile(name, data, function(err) {
          if(err) {
              console.log(err);
              reject()
          } else {
              console.log("The file was saved!");
              resolve()
          }
      }); 
    })
}

//execute
const executeCode=(data,input)=>{
	return new Promise((resolve,reject)=>{
		const fileName="test.c";
		saveFile(fileName,data)
			.then(()=>{
				fs.writeFile("input.txt",input,(err,data)=>{
					if(err){
						console.log(err);
						reject();
					}
				});


            const filePath = path.join(__dirname,"../test.c")
              exec('gcc '+filePath, (err, stdout, stderr) => {
                if (err) {
                  // IF COMPILATION ERROR
                  console.error(`exec error: ${err}`);
                  resolve({
                    err: true,
                    output: err,
                    error: stderr
                  })
                }
                
                // SUCCESSFULL COMPILATION EXECUTING
                console.log("SUCCESSFULLY COMPILED")
                exec('./a.out < '+__dirname+'/../input.txt', (err, stdout, stderr) => {
                  if(err){
                    console.log("ERROR "+err)
                    resolve({
                      err: true,
                      output: err,
                      error: stderr
                    })
                  }
        
                  console.log("OUTPUT ", stdout)
                  resolve({
                    err: false,
                    output: stdout
                  })
                })
              })

			})
			.catch((err)=>{
				console.error(err);
				const Err = {
			        err: true,
			        output: "Internal Server Error!"
			      }
			      resolve(Err)
			})
	})
}

module.exports={
	executeCode,
	saveFile
}