const Contests=require(`${__dirname}/models/contestModel`);
const Users= require(`${__dirname}/models/userModel`);
exports.startSocket=server=>{
	const io=require('socket.io')(server,{
		cors:{
			origin:'http://localhost:3000',
			credentials:true
		}
	});
	let contest,contestUsers=[];
	const getUser=async (userId)=>{
		let user=contestUsers.find(user=>user.id===userId);
		if(!user){
			user=await Users.findById(userId);	
			contestUsers.push(user);
		}
		return user;			
	};
	const emitError=(error,id)=>io.to(id).emit('error',error);
	const sendResponse=async (event,roomId,userId,message)=>{
		const user=await getUser(userId);
		if(user){
			const {name}=user;
			io.in(roomId).emit(event,{name,message});
		}
		else{
			console.log(`User-${userId} not found`)
		}		
	};
	const checkValidUser=async (socket,userObj)=>{
		const {userId,roomId,id}=userObj;
		console.log(userId,roomId,id);
		contest=await Contests.findOne({contestUrl:roomId});
		if(!contest||!contest.users.includes(userId)||contest.endedAt||contest.winner){	
			emitError({status:'error',message:'You are not authorized to enter this contest'},id);
		}
		else{
			socket.join(roomId);
			io.in(roomId).emit('joined_contest_room',{status:'success',message:`User->${id} successfully joined the room(${roomId})`});
			socket.on('code_executed',({roomId,userId,message})=>sendResponse('code_executed_server',roomId,userId,message));
			socket.on('winner_declared',({roomId,userId,message})=>sendResponse('winner_declared_server',roomId,userId,message));			
		}		
	};
	io.on('connection',socket=>{
		socket.on('participant_connected',userObj=>{
			checkValidUser(socket,userObj);			
		});
		socket.on('disconnect',reason=>{console.log(`${socket.id} disconnected due to ${reason}`);});
	});
};
