import Axios from 'axios';
import React, { useEffect, useState } from 'react'

function Profile() {
    const [user_id, setuser_id] = useState("");
    useEffect(() => {
        setuser_id(window.localStorage.getItem("userId"));
        async function fun(){
            await Axios.get(`/users/${user_id}`)
            .then((res)=>{
                console.log(res);
            }).catch((err)=>console.log(err));
        }
        fun();
    }, [])
    return (
        <div>
            {user_id}
        </div>
    )
}

export default Profile
