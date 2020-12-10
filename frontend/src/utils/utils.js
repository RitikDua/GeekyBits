const storage=localStorage;

const  getToken=()=>{
    return storage.getItem("login");
}
const getUserId=()=>{
  const token=getToken();
  const payload=JSON.parse(atob(token.split('.')[1]));     
  console.log(payload);
    return payload.id;
}
const isLoggedIn=()=>{
    const token=getToken();
    if(token){
          const payload=JSON.parse(atob(token.split('.')[1]));     
      return ((Date.now()/1000)-payload.iat)<6.048e+8;
    }
    else{
      return false;
    }
}

module.exports={
  storage,getToken,isLoggedIn,getUserId
}