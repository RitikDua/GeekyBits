const {executeCode,saveFile} = require('../../../middlewares/CompileCode');
const fs = require('fs');

describe('Compile Code Middleware',() => {
    it('should save the file',() =>{
        const req = {
            header: jest.fn().mockReturnValue(token)
        };
        const res={};
        const next = jest.fn();
        executeCode(req,res);
        expect(req.user).toMatchObject(user);
    });
});