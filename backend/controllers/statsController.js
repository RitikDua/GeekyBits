

const Attempts=require("../models/attemptModel");

exports.countAttempts=async (req,res,next)=>{
	try{
		console.log(req.query);
		const {field,status}=req.query;
		const unique="$"+field;//it can be "user" as a string or "`5fb6353bb0354e4ea8176a4c` as userId"
 		const count=await Attempts.aggregate([
			{$match:{attemptResult:status}},
			{
				$group:{
					_id:unique,
					count:{$sum:1}
				}
			}
		])
		res.status(200).json({
			count:count
		})
	}
	catch(err){
		res.status(500).json({ status:'error',
            message:err.message,
            err:err
        })
	}
}
