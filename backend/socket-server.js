const Contests=require(`${__dirname}/models/contestModel`);
exports.startSocket=server=>{
	const io=require('socket.io')(server,{
		cors:{
			origin:'http://localhost:3000',
			credentials:true
		}
	});
	const emitError=(error,id)=>{console.log("Error");io.to(id).emit('error',error);}
	const checkValidUser=async (socket,userObj)=>{
		const {userId,roomId,id}=userObj;
		const contest=await Contests.findOne({users:userId});
		if(!contest||contest.contestUrl!==roomId){	
			emitError({status:'400',message:'You are not authorized to enter this contest'},id);
		}
		else{
			socket.join(roomId);
			socket.to(roomId).emit('joined_contest_room',{status:'success',message:'Successfully joined the room,you can proceed further'});
		}		
	};
	io.on('connection',socket=>{
		socket.on('participant_connected',userObj=>checkValidUser(socket,userObj));
		socket.on('code_executed',(roomId,message)=>io.to(roomId).emit('code_executed',message));
		socket.on('winner_declared',(roomId,message)=>io.to(roomId).emit('winner_declared',message));
		socket.on('disconnect',reason=>{
			console.log(`${socket.id} disconnected due to ${reason}`);
		});
	});
};
